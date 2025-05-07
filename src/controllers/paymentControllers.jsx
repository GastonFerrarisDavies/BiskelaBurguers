import mercadopago from "mercadopago"
export const createOrder = ( req, res) => {
    mercadopago.configure({
        access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
        public_key: process.env.MERCADO_PAGO_PUBLIC_KEY
    })

    mercadopago.preferences.create({
        items: [
            {
                title: "Producto",
                quantity: 1,
                unit_price: 100,
                currency_id: "ARS",
            }
        ],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending"
        }
    })
    const { direccion, metodoPago, total } = req.body
    const { session } = req.context
    const { user } = session
    const { cart } = req.body
    
}
