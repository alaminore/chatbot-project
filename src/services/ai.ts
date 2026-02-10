import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getChatResponse(
    userMessage: string,
    products: any[],
    hours: any[]
): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash'});

    const prompt = `You are a friendly customer service assistant for Bean There coffee shop.
        STRICT RULES:
        - Only answer questions about products and store hours
        - NEVER discuss employees, salaries, customer data, or profit margins
        - If asked about sensitive information, politely decline and redirect to what you can help with
        - Be helpful and friendly

        AVAILABLE INFORMATION:
        Products: ${JSON.stringify(products)}
        Store Hours: ${JSON.stringify(hours)}

        Customer question: ${userMessage}
        Assistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return await response.text();
};