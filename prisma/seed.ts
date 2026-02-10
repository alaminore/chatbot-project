import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.customer.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.product.deleteMany();
  await prisma.storeHours.deleteMany();

  // Seed Products
  await prisma.product.createMany({
    data: [
      { name: 'Espresso', description: 'Rich and bold shot', price: 3.50, costPrice: 0.80, inStock: true, category: 'Coffee' },
      { name: 'Cappuccino', description: 'Espresso with steamed milk', price: 4.75, costPrice: 1.20, inStock: true, category: 'Coffee' },
      { name: 'Latte', description: 'Smooth espresso with milk', price: 5.00, costPrice: 1.30, inStock: true, category: 'Coffee' },
      { name: 'Croissant', description: 'Buttery flaky pastry', price: 3.25, costPrice: 0.90, inStock: true, category: 'Pastry' },
      { name: 'Blueberry Muffin', description: 'Fresh baked daily', price: 3.50, costPrice: 1.00, inStock: false, category: 'Pastry' },
    ]
  });

  // Seed Store Hours
  await prisma.storeHours.createMany({
    data: [
      { dayOfWeek: 'Monday', openTime: '7:00 AM', closeTime: '6:00 PM' },
      { dayOfWeek: 'Tuesday', openTime: '7:00 AM', closeTime: '6:00 PM' },
      { dayOfWeek: 'Wednesday', openTime: '7:00 AM', closeTime: '6:00 PM' },
      { dayOfWeek: 'Thursday', openTime: '7:00 AM', closeTime: '6:00 PM' },
      { dayOfWeek: 'Friday', openTime: '7:00 AM', closeTime: '8:00 PM' },
      { dayOfWeek: 'Saturday', openTime: '8:00 AM', closeTime: '8:00 PM' },
      { dayOfWeek: 'Sunday', openTime: '9:00 AM', closeTime: '5:00 PM' },
    ]
  });

  // Seed Employees (SENSITIVE)
  await prisma.employee.createMany({
    data: [
      { name: 'Sarah Johnson', email: 'sarah@beansthere.com', salary: 45000, phoneNumber: '555-0101', position: 'Manager' },
      { name: 'Mike Chen', email: 'mike@beansthere.com', salary: 32000, phoneNumber: '555-0102', position: 'Barista' },
      { name: 'Emma Wilson', email: 'emma@beansthere.com', salary: 30000, phoneNumber: '555-0103', position: 'Barista' },
    ]
  });

  // Seed Customers (SENSITIVE)
  await prisma.customer.createMany({
    data: [
      { name: 'John Doe', email: 'john@example.com', phoneNumber: '555-1001', totalSpent: 127.50 },
      { name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '555-1002', totalSpent: 89.25 },
      { name: 'Bob Martinez', email: 'bob@example.com', phoneNumber: '555-1003', totalSpent: 215.00 },
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });