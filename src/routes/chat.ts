import { Request, Response } from "express";
import { sanitizeInput, validateInput } from "../helpers/sanitize";
import { getSafeProducts, getStoreHours } from "../services/database";
import { getChatResponse } from "../services/ai";

export async function handleChat (req: Request, res: Response) {
    try {
        const userMessage = req.body.message;

        const validation = validateInput(userMessage);
        if (!validation.valid) {
            return res.status(400).json({error: validation.error});
        }

        const sanitizedMessage = sanitizeInput(userMessage);

        const products = await getSafeProducts();
        const hours = await getStoreHours();

        const aiResponse = await getChatResponse(sanitizedMessage, products, hours);

        res.json({reply: aiResponse});


    } catch (error) {
        console.log('Chat error: ', error);
        res.status(500).json({ error: 'Failed to get response'});
    }
}