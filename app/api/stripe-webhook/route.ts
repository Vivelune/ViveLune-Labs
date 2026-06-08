import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { updatedSubscription } from "@/actions/stripe";

const STRIPE_SUBSCRIPTION_EVENTS = new Set([
    "invoice.created",
    "invoice.finalized",
    "invoice.paid",
    "checkout.session.completed",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "customer.subscription.created",

])

const getStripeEvent = async (
    body: string,
    sig : string | null
): Promise<Stripe.Event> => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if(!sig || !webhookSecret){
        throw new Error("Stripe signature or webhook secret is missing")
    }

    return stripe.webhooks.constructEvent(body, sig, webhookSecret)
}


export async function POST(req : NextRequest){
    console.log("RECIEVED STRIPE WEBHOOK EVENT ")
    const body = await req.text()

    const signature = (await headers()).get('Stripe-Signature')

    try {
        const stripeEvent = await getStripeEvent(body, signature)
         if(!STRIPE_SUBSCRIPTION_EVENTS.has(stripeEvent.type)){
            console.log("UNHANDLED IRRELEVANT EVENT", stripeEvent.type)
            return NextResponse.json({received : true }, {status : 200})
          }

          const event = stripeEvent.data.object as Stripe.Subscription
          const metadata = event.metadata

          if(
            metadata.connectAccountPayments || metadata.connectAccountSubscriptions
          ){
            console.log("Skipping connected account subscription event")
            return NextResponse.json(
                {message : "Skipping connected account event"},
                {status : 200}
            )
          }



          switch(stripeEvent.type){
            case 'checkout.session.completed':

            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                await updatedSubscription(event)
                console.log('CREATED FROM WEBHOOK ', event)
                return NextResponse.json({recieved : true }, {status : 200})
            default:
                console.log('Unhandled Relevant Event!', stripeEvent.type)
                return NextResponse.json({recieved : true }, {status : 200})
          }

            
        
    } catch (error : any) {
        console.error('Error processing Stripe webhook:', error)
        return new NextResponse(`WEBHOOK ERROR : ${error.message}`, {
            status : error.statusCode || 500,
        })
}
}