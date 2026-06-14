import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, email, name, reference } = await request.json();

    // Validate required fields
    if (!amount || !email || !name || !reference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // ✅ Check if secret key exists
    if (!process.env.FLUTTERWAVE_SECRET_KEY) {
      console.error('FLUTTERWAVE_SECRET_KEY is missing');
      return NextResponse.json(
        { error: 'Payment configuration error' },
        { status: 500 }
      );
    }

    // Flutterwave v4 - Direct initialization
    const paymentResponse = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: reference,
        amount: Number(amount),
        currency: 'USD',
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        customer: {
          email: email,
          name: name,
        },
        customizations: {
          title: 'Rental Application Fee',
          description: 'Apartment Screening Application',
          logo: 'https://alex-rentals.live/logo.png',
        },
      }),
    });

    const paymentData = await paymentResponse.json();

    // Check if payment initialization was successful
    if (!paymentData.status || paymentData.status !== 'success') {
      console.error('Flutterwave error:', paymentData);
      return NextResponse.json(
        { error: paymentData.message || 'Payment initialization failed' },
        { status: 400 }
      );
    }

    // ✅ Verify that the link exists in the response
    if (!paymentData.data?.link) {
      console.error('No payment link in response:', paymentData);
      return NextResponse.json(
        { error: 'Invalid payment response from Flutterwave' },
        { status: 500 }
      );
    }

    // Return the hosted payment link
    return NextResponse.json({ 
      url: paymentData.data.link,
      reference: reference 
    });
    
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment initialization failed' }, 
      { status: 500 }
    );
  }
}