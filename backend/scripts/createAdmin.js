// backend/scripts/createAdmin.js
// Run this script to create your first admin user
// Usage: npm run create-admin  OR  node scripts/createAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected...');

    const adminData = {
      name: 'Admin User',
      email: 'admin@cinema.com',
      password: 'Admin123!',  // Must meet password requirements
      role: 'admin'
    };

    console.log('\n📋 Creating admin with the following details:');
    console.log('-----------------------------------');
    console.log('Name:', adminData.name);
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('-----------------------------------\n');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email!');
      console.log('   Email:', existingAdmin.email);
      console.log('   Role:', existingAdmin.role);
      console.log('   Created:', existingAdmin.createdAt);
      process.exit(1);
    }

    // Create admin user
    const admin = await User.create(adminData);

    console.log('✅ Admin user created successfully!');
    console.log('═══════════════════════════════════════════════');
    console.log('👤 Name:', admin.name);
    console.log('📧 Email:', admin.email);
    console.log('👑 Role:', admin.role);
    console.log('🆔 User ID:', admin._id);
    console.log('📅 Created:', admin.createdAt);
    console.log('═══════════════════════════════════════════════');
    console.log('⚠️  IMPORTANT: Change the password after first login!');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:');
      Object.keys(error.errors).forEach(key => {
        console.error(`  - ${key}: ${error.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

createAdmin();