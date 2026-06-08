"use server"

import { stripe } from "@/lib/stripe"
import { onAuthenticateUser } from "./auth"
import Stripe from "stripe"
import prisma from "@/lib/prisma"
import { subscriptionPriceId } from "@/lib/data"

export const getAllProductsFromStripe = async () => {
    try {
        const currentUser = await onAuthenticateUser()
        if(!currentUser.user){
            return {
                error: "User not authenticated",
                status: 401, 
                success: false
            }
        }

        if(!currentUser.user.stripeConnectId){
            return {
                error: "User not connected to Stripe",
                status: 401, 
                success: false
            }
        }

        const products = await stripe.products.list(
            {},
            {
                stripeAccount : currentUser.user.stripeConnectId,
            }
        )

        return{
            products: products.data,
            status: 200,
            success: true,
        }
         

    } catch (error) {
        console.log("Error getting products from Stripe", error)
        return{
            error: "Error getting products from Stripe",
            status: 500,
            success: false,
        }
    }
}


export const onGetStripeClientSecret = async (email: string , userId : string )=>{
    try {
       
        let customer : Stripe.Customer
        const existingCustomers = await stripe.customers.list({email:email})
        if(existingCustomers.data.length > 0){
            customer = existingCustomers.data[0]
        }else{
            customer= await stripe.customers.create({
                email:email,
                metadata:{
                    userId: userId
                }
            })
        }

        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
            stripeCustomerId : customer.id
            }   
        })


        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{price : subscriptionPriceId}],
            payment_behavior : "default_incomplete",
            payment_settings: {
                save_default_payment_method: "on_subscription",
              },
              expand: ["latest_invoice.confirmation_secret"],
              metadata: {
                userId,
              },
        })


        const invoice = subscription.latest_invoice as Stripe.Invoice;

        return {
            status: 200,
            secret: invoice.confirmation_secret?.client_secret,
            customerId: customer.id,
          };

    } catch (error) {
        console.error('Subscription creation error: ', error)
        return{
            status: 400, message : 'Failed to create subscription'
        }
    }
}

 export const updatedSubscription = async (subscriptiom : Stripe.Subscription) => {
    try {
        const userId = subscriptiom.metadata.userId

        await prisma.user.update({
            where:{id:userId},
            data:{
                subscription: subscriptiom.status === 'active' ? true : false,
            },
        })

    } catch (error) {
        console.error('Error Updating Subscription', error)
    }
 }