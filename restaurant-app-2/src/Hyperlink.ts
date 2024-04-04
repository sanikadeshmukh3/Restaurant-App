import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-IDeNUchtbLXaxGTTqJV3pinh"
});

async function main() {
    const stream = await openai.chat.completions.create({
        model : "gpt-3.5-da-vinci",
        messages: [{
            role : "user",
            content: "Say this is a test"
        }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || " ");
    }
}

main();
