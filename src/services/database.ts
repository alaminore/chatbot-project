import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getSafeProducts() {
    return await prisma.product.findMany({
        select: {
            name: true,
            description: true,
            price: true,
            stockLevel: true,  
            category: true
        }
    })
}

export async function getStoreHours() {
    return await prisma.storeHours.findMany();
}

export async function getStoreInfo() {
  return await prisma.storeInfo.findMany();
}