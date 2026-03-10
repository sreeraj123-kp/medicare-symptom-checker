const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

class MockDatabase {
  constructor() {
    this.collections = {
      users: new Map(),
      symptoms_records: new Map(),
      doctors: new Map()
    };
    this._loadFromDisk();
    this._seedDoctors();
    this._seedAdmin();
  }

  // ---- Persistence: Load / Save ----
  _loadFromDisk() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (data.users) {
          for (const [k, v] of Object.entries(data.users)) {
            this.collections.users.set(k, v);
          }
        }
        if (data.symptoms_records) {
          for (const [k, v] of Object.entries(data.symptoms_records)) {
            this.collections.symptoms_records.set(k, v);
          }
        }
        console.log(`   📂 Loaded ${this.collections.users.size} users, ${this.collections.symptoms_records.size} records from disk`);
      }
    } catch (err) {
      console.error('Failed to load data from disk:', err.message);
    }
  }

  _saveToDisk() {
    try {
      const data = {
        users: Object.fromEntries(this.collections.users),
        symptoms_records: Object.fromEntries(this.collections.symptoms_records)
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save data to disk:', err.message);
    }
  }

  // ---- Seeding ----
  _seedAdmin() {
    // Only seed admin if not already in database
    const existingUsers = Array.from(this.collections.users.values());
    const adminExists = existingUsers.some(u => u.email === 'admin@symptomchecker.com');
    if (adminExists) return;

    const bcrypt = require('bcryptjs');
    const adminId = 'admin-001';
    this.collections.users.set(adminId, {
      user_id: adminId,
      id: adminId,
      name: 'Admin',
      email: 'admin@symptomchecker.com',
      password: bcrypt.hashSync('admin123', 10),
      age: 30,
      gender: 'other',
      role: 'admin',
      created_at: new Date().toISOString()
    });
    this._saveToDisk();
  }

  _seedDoctors() {
    const doctors = [
      { name: 'Dr. Rajesh Reddy', specialization: 'General Physician', hospital: 'Apollo Hospital', location: 'Jubilee Hills, Hyderabad', contact: '+91 98765 43210', lat: 17.4326, lng: 78.4071 },
      { name: 'Dr. Lavanya Sharma', specialization: 'General Physician', hospital: 'Yashoda Hospital', location: 'Somajiguda, Hyderabad', contact: '+91 98765 43211', lat: 17.4239, lng: 78.4541 },
      { name: 'Dr. Srinivas Rao', specialization: 'Neurologist', hospital: 'KIMS Hospital', location: 'Secunderabad, Hyderabad', contact: '+91 98765 43212', lat: 17.4399, lng: 78.4983 },
      { name: 'Dr. Anitha Kumari', specialization: 'Neurologist', hospital: 'Care Hospital', location: 'Banjara Hills, Hyderabad', contact: '+91 98765 43213', lat: 17.4156, lng: 78.4347 },
      { name: 'Dr. Venkat Prasad', specialization: 'Cardiologist', hospital: 'NIMS Hospital', location: 'Punjagutta, Hyderabad', contact: '+91 98765 43214', lat: 17.4285, lng: 78.4500 },
      { name: 'Dr. Priya Naidu', specialization: 'Cardiologist', hospital: 'Continental Hospital', location: 'Gachibowli, Hyderabad', contact: '+91 98765 43215', lat: 17.4401, lng: 78.3489 },
      { name: 'Dr. Arun Kumar', specialization: 'Dermatologist', hospital: 'Omega Hospital', location: 'Banjara Hills, Hyderabad', contact: '+91 98765 43216', lat: 17.4180, lng: 78.4400 },
      { name: 'Dr. Swathi Reddy', specialization: 'Dermatologist', hospital: 'Apollo Spectra', location: 'Kondapur, Hyderabad', contact: '+91 98765 43217', lat: 17.4574, lng: 78.3627 },
      { name: 'Dr. Ravi Teja', specialization: 'Gastroenterologist', hospital: 'AIG Hospital', location: 'Gachibowli, Hyderabad', contact: '+91 98765 43218', lat: 17.4372, lng: 78.3540 },
      { name: 'Dr. Deepika Saxena', specialization: 'Gastroenterologist', hospital: 'Gleneagles Global', location: 'Lakdi Ka Pul, Hyderabad', contact: '+91 98765 43219', lat: 17.4050, lng: 78.4670 },
      { name: 'Dr. Sudheer Varma', specialization: 'Pulmonologist', hospital: 'Yashoda Hospital', location: 'Malakpet, Hyderabad', contact: '+91 98765 43220', lat: 17.3750, lng: 78.5010 },
      { name: 'Dr. Kavitha Devi', specialization: 'Pulmonologist', hospital: 'Star Hospital', location: 'Banjara Hills, Hyderabad', contact: '+91 98765 43221', lat: 17.4210, lng: 78.4380 },
      { name: 'Dr. Manoj Krishna', specialization: 'ENT Specialist', hospital: 'Renova ENT Hospital', location: 'Ameerpet, Hyderabad', contact: '+91 98765 43222', lat: 17.4375, lng: 78.4482 },
      { name: 'Dr. Pooja Saxena', specialization: 'ENT Specialist', hospital: 'Apollo Hospital', location: 'Jubilee Hills, Hyderabad', contact: '+91 98765 43223', lat: 17.4326, lng: 78.4071 }
    ];

    doctors.forEach(doc => {
      const id = uuidv4();
      this.collections.doctors.set(id, { doctor_id: id, ...doc });
    });
  }

  // ---- CRUD Operations ----
  async add(collection, data) {
    const id = data.id || uuidv4();
    this.collections[collection].set(id, { ...data, id });
    this._saveToDisk();
    return { id, ...data };
  }

  async get(collection, id) {
    return this.collections[collection].get(id) || null;
  }

  async getAll(collection) {
    return Array.from(this.collections[collection].values());
  }

  async query(collection, field, value) {
    const all = Array.from(this.collections[collection].values());
    return all.filter(item => item[field] === value);
  }

  async queryByField(collection, field, value) {
    return this.query(collection, field, value);
  }

  async update(collection, id, data) {
    const existing = this.collections[collection].get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    this.collections[collection].set(id, updated);
    this._saveToDisk();
    return updated;
  }

  async delete(collection, id) {
    const result = this.collections[collection].delete(id);
    this._saveToDisk();
    return result;
  }

  async count(collection) {
    return this.collections[collection].size;
  }
}

const db = new MockDatabase();
module.exports = db;
