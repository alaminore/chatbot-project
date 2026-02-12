import { PrismaClient, OrderStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.product.deleteMany();
  await prisma.storeHours.deleteMany();
  await prisma.storeInfo.deleteMany();

  console.log('Cleared existing data...');

  // Seed Products
  const products = await prisma.product.createMany({
    data: [
      // Coffee
      { name: 'Espresso', description: 'Rich and bold shot', price: 3.50, costPrice: 0.80, category: 'Coffee', stockLevel: 100 },
      { name: 'Cappuccino', description: 'Espresso with steamed milk', price: 4.75, costPrice: 1.20, category: 'Coffee', stockLevel: 85 },
      { name: 'Latte', description: 'Smooth espresso with milk', price: 5.00, costPrice: 1.30, category: 'Coffee', stockLevel: 90 },
      { name: 'Americano', description: 'Espresso with hot water', price: 3.75, costPrice: 0.90, category: 'Coffee', stockLevel: 95 },
      { name: 'Mocha', description: 'Espresso with chocolate', price: 5.25, costPrice: 1.50, category: 'Coffee', stockLevel: 70 },
      { name: 'Cold Brew', description: 'Smooth cold coffee', price: 4.50, costPrice: 1.10, category: 'Coffee', stockLevel: 60 },
      
      // Pastries
      { name: 'Croissant', description: 'Buttery flaky pastry', price: 3.25, costPrice: 0.90, category: 'Pastry', stockLevel: 30 },
      { name: 'Blueberry Muffin', description: 'Fresh baked daily', price: 3.50, costPrice: 1.00, category: 'Pastry', stockLevel: 0 }, // Out of stock
      { name: 'Chocolate Chip Cookie', description: 'Warm and gooey', price: 2.75, costPrice: 0.70, category: 'Pastry', stockLevel: 45 },
      { name: 'Cinnamon Roll', description: 'Sweet and sticky', price: 4.00, costPrice: 1.20, category: 'Pastry', stockLevel: 20 },
      { name: 'Banana Bread', description: 'Moist and delicious', price: 3.75, costPrice: 1.00, category: 'Pastry', stockLevel: 15 },
      { name: 'Scone', description: 'Traditional British treat', price: 3.00, costPrice: 0.85, category: 'Pastry', stockLevel: 25 },
    ]
  });

  console.log('Seeded products...');

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

  console.log('Seeded store hours...');

  // Seed Store Info
  await prisma.storeInfo.createMany({
    data: [
      { key: 'address', value: '123 Coffee Lane, Bean City, BC V1A 2B3, Canada', category: 'location', displayName: 'Address' },
      { key: 'parking', value: 'Free parking available in rear lot with 20 spaces', category: 'location', displayName: 'Parking' },
      { key: 'wifi', value: 'BeanThere-Guest, Password: coffee2026', category: 'amenities', displayName: 'WiFi' },
      { key: 'phone', value: '(555) 123-4567', category: 'contact', displayName: 'Phone' },
      { key: 'email', value: 'hello@beanthere.coffee', category: 'contact', displayName: 'Email' },
      { key: 'seating', value: '40 indoor seats, 12 outdoor patio seats', category: 'amenities', displayName: 'Seating' },
    ]
  });

  console.log('Seeded store info...');

  // Seed Employees (SENSITIVE)
  await prisma.employee.createMany({
    data: [
      { name: 'Sarah Johnson', email: 'sarah@beanthere.com', salary: 45000, phoneNumber: '555-0101', position: 'Manager' },
      { name: 'Mike Chen', email: 'mike@beanthere.com', salary: 32000, phoneNumber: '555-0102', position: 'Barista' },
      { name: 'Emma Wilson', email: 'emma@beanthere.com', salary: 30000, phoneNumber: '555-0103', position: 'Barista' },
      { name: 'James Martinez', email: 'james@beanthere.com', salary: 31000, phoneNumber: '555-0104', position: 'Barista' },
    ]
  });

  console.log('Seeded employees...');

  // Seed Customers (SENSITIVE)
  const customers = await prisma.customer.createMany({
    data: [
      { name: 'John Doe', email: 'john@example.com', phoneNumber: '555-1001', totalSpent: 0 },
      { name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '555-1002', totalSpent: 0 },
      { name: 'Bob Martinez', email: 'bob@example.com', phoneNumber: '555-1003', totalSpent: 0 },
      { name: 'Alice Wong', email: 'alice@example.com', phoneNumber: '555-1004', totalSpent: 0 },
      { name: 'David Brown', email: 'david@example.com', phoneNumber: '555-1005', totalSpent: 0 },
      { name: 'Lisa Anderson', email: 'lisa@example.com', phoneNumber: '555-1006', totalSpent: 0 },
      { name: 'Tom Wilson', email: 'tom@example.com', phoneNumber: '555-1007', totalSpent: 0 },
      { name: 'Maria Garcia', email: 'maria@example.com', phoneNumber: '555-1008', totalSpent: 0 },
    ]
  });

  console.log('Seeded customers...');

  // Get customer and product IDs for orders
  const allCustomers = await prisma.customer.findMany();
  const allProducts = await prisma.product.findMany();

  // Seed Orders with realistic data
  const orders = [];
  
  // Create 20 orders over the past 30 days
  for (let i = 0; i < 20; i++) {
    const randomCustomer = allCustomers[Math.floor(Math.random() * allCustomers.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - daysAgo);
    
    const status: OrderStatus = daysAgo === 0 ? OrderStatus.PENDING : (Math.random() > 0.05 ? OrderStatus.COMPLETED : OrderStatus.CANCELLED);
    
    orders.push({
      customerId: randomCustomer.id,
      orderDate: orderDate,
      totalAmount: 0, // Will update after items
      status: status
    });
  }

  for (const orderData of orders) {
    const order = await prisma.order.create({
      data: orderData
    });

    // Add 1-4 random items to each order
    const numItems = Math.floor(Math.random() * 4) + 1;
    let orderTotal = 0;

    for (let j = 0; j < numItems; j++) {
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const itemPrice = randomProduct.price;
      
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: randomProduct.id,
          quantity: quantity,
          price: itemPrice
        }
      });

      orderTotal += itemPrice * quantity;
    }

    // Update order total and customer totalSpent
    await prisma.order.update({
      where: { id: order.id },
      data: { totalAmount: orderTotal }
    });

    if (orderData.status === 'COMPLETED') {
      await prisma.customer.update({
        where: { id: orderData.customerId },
        data: {
          totalSpent: {
            increment: orderTotal
          }
        }
      });
    }
  }

  console.log('Seeded orders and order items...');
  console.log('Database seeded successfully! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });