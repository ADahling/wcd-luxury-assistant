
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { clientName, emailType, context } = body;

    const systemPrompt = `You are Grant Kelly's luxury executive assistant for World Class Detailing (WCD954.com), South Florida's premier detailing and pressure cleaning company. 

Generate a professional, warm, and elegant email with a luxury concierge tone. The email should:
- Be personalized and sophisticated
- Reflect the white-glove service experience
- Include appropriate luxury language without being pretentious
- Be concise yet thorough
- Include Grant Kelly's contact information in the signature

Grant Kelly Contact Information:
Email: grant@wcd954.com
Phone: (954) XXX-XXXX
Website: WCD954.com

Generate the email content only (subject and body), ready to be copied and sent.`;

    const userPrompt = `Email Type: ${emailType}
Client Name: ${clientName || 'Valued Client'}
Context: ${context || 'Standard communication'}

Please generate an appropriate email for this situation.`;

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const emailContent = data.choices?.[0]?.message?.content;

    if (!emailContent) {
      throw new Error('No email content generated');
    }

    return NextResponse.json({ 
      emailContent,
      success: true 
    });

  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json({ 
      error: "Failed to generate email",
      success: false 
    }, { status: 500 });
  }
}
