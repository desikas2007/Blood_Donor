const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.bloodRequest.deleteMany();
  await prisma.requester.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("Password123!", 10);

  // --- Users ---
  const donor1 = await prisma.user.create({
    data: {
      email: "donor1@test.com",
      password: hashedPassword,
      role: "donor",
      name: "Arun Kumar",
      phone: "+91-9876543210",
    },
  });

  const donor2 = await prisma.user.create({
    data: {
      email: "donor2@test.com",
      password: hashedPassword,
      role: "donor",
      name: "Priya Devi",
      phone: "+91-9876543211",
    },
  });

  const donor3 = await prisma.user.create({
    data: {
      email: "donor3@test.com",
      password: hashedPassword,
      role: "donor",
      name: "Ravi Shankar",
      phone: "+91-9876543212",
    },
  });

  const donor4 = await prisma.user.create({
    data: {
      email: "donor4@test.com",
      password: hashedPassword,
      role: "donor",
      name: "Meena Kumari",
      phone: "+91-9876543213",
    },
  });

  const donor5 = await prisma.user.create({
    data: {
      email: "donor5@test.com",
      password: hashedPassword,
      role: "donor",
      name: "Suresh Babu",
      phone: "+91-9876543214",
    },
  });

  const hospitalUser = await prisma.user.create({
    data: {
      email: "hospital@test.com",
      password: hashedPassword,
      role: "hospital",
      name: "City Hospital",
      phone: "+91-9876543220",
    },
  });

  const orgUser = await prisma.user.create({
    data: {
      email: "organization@test.com",
      password: hashedPassword,
      role: "organization",
      name: "Red Cross Society",
      phone: "+91-9876543230",
    },
  });

  // --- Donors ---
  const d1 = await prisma.donor.create({
    data: {
      userId: donor1.id,
      fullName: "Arun Kumar",
      phone: "+91-9876543210",
      email: "donor1@test.com",
      bloodGroup: "A+",
      city: "Tiruchengode",
      state: "Tamil Nadu",
      available: true,
    },
  });

  const d2 = await prisma.donor.create({
    data: {
      userId: donor2.id,
      fullName: "Priya Devi",
      phone: "+91-9876543211",
      email: "donor2@test.com",
      bloodGroup: "B+",
      city: "Chennai",
      state: "Tamil Nadu",
      available: true,
    },
  });

  const d3 = await prisma.donor.create({
    data: {
      userId: donor3.id,
      fullName: "Ravi Shankar",
      phone: "+91-9876543212",
      email: "donor3@test.com",
      bloodGroup: "O+",
      city: "Coimbatore",
      state: "Tamil Nadu",
      available: true,
      lastDonationDate: "2026-06-15",
    },
  });

  const d4 = await prisma.donor.create({
    data: {
      userId: donor4.id,
      fullName: "Meena Kumari",
      phone: "+91-9876543213",
      email: "donor4@test.com",
      bloodGroup: "AB+",
      city: "Tiruchengode",
      state: "Tamil Nadu",
      available: false,
    },
  });

  const d5 = await prisma.donor.create({
    data: {
      userId: donor5.id,
      fullName: "Suresh Babu",
      phone: "+91-9876543214",
      email: "donor5@test.com",
      bloodGroup: "A-",
      city: "Salem",
      state: "Tamil Nadu",
      available: true,
    },
  });

  // --- Requesters ---
  const hospital = await prisma.requester.create({
    data: {
      userId: hospitalUser.id,
      type: "hospital",
      name: "City Hospital",
      phone: "+91-9876543220",
      email: "hospital@test.com",
      city: "Tiruchengode",
      state: "Tamil Nadu",
      address: "123 Main Road, Tiruchengode",
    },
  });

  const organization = await prisma.requester.create({
    data: {
      userId: orgUser.id,
      type: "organization",
      name: "Red Cross Society",
      phone: "+91-9876543230",
      email: "organization@test.com",
      city: "Chennai",
      state: "Tamil Nadu",
      address: "456 Anna Salai, Chennai",
      organizationType: "ngo",
    },
  });

  // --- Blood Requests ---
  await prisma.bloodRequest.create({
    data: {
      donorId: d1.id,
      donorName: "Arun Kumar",
      donorBloodGroup: "A+",
      donorCity: "Tiruchengode",
      requesterId: hospital.id,
      requesterName: "City Hospital",
      requesterType: "hospital",
      bloodGroup: "A+",
      message: "Urgent need for A+ blood for emergency surgery.",
      status: "pending",
    },
  });

  await prisma.bloodRequest.create({
    data: {
      donorId: d2.id,
      donorName: "Priya Devi",
      donorBloodGroup: "B+",
      donorCity: "Chennai",
      requesterId: hospital.id,
      requesterName: "City Hospital",
      requesterType: "hospital",
      bloodGroup: "B+",
      message: "Need B+ blood for a patient undergoing treatment.",
      status: "accepted",
    },
  });

  await prisma.bloodRequest.create({
    data: {
      donorId: d3.id,
      donorName: "Ravi Shankar",
      donorBloodGroup: "O+",
      donorCity: "Coimbatore",
      requesterId: organization.id,
      requesterName: "Red Cross Society",
      requesterType: "organization",
      bloodGroup: "O+",
      message: "Blood donation camp needs O+ donors.",
      status: "completed",
    },
  });

  await prisma.bloodRequest.create({
    data: {
      donorId: d5.id,
      donorName: "Suresh Babu",
      donorBloodGroup: "A-",
      donorCity: "Salem",
      requesterId: organization.id,
      requesterName: "Red Cross Society",
      requesterType: "organization",
      bloodGroup: "A-",
      message: "Rare blood group needed for thalassemia patient.",
      status: "pending",
    },
  });

  console.log("Seed completed!");
  console.log("Test credentials (all passwords: Password123!):");
  console.log("  Donor 1:      donor1@test.com (A+, Tiruchengode)");
  console.log("  Donor 2:      donor2@test.com (B+, Chennai)");
  console.log("  Donor 3:      donor3@test.com (O+, Coimbatore)");
  console.log("  Donor 4:      donor4@test.com (AB+, Tiruchengode)");
  console.log("  Donor 5:      donor5@test.com (A-, Salem)");
  console.log("  Hospital:     hospital@test.com");
  console.log("  Organization: organization@test.com");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
