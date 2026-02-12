import { Request, Response } from 'express';
import { getSafeProducts, getStoreHours } from '../services/database.js';

export async function renderHome(req: Request, res: Response) {
  try {
    const products = await getSafeProducts();
    const hours = await getStoreHours();
    
    res.render('index', { products, hours });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Error loading page');
  }
}