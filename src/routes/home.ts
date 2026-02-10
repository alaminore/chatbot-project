import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function renderHome(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany({
      select: { 
        name: true, 
        price: true, 
        category: true, 
        description: true, 
        inStock: true 
      }
    });
    
    const hours = await prisma.storeHours.findMany();
    
    res.render('index', { products, hours });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Error loading page');
  }
}