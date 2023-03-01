export type User = {
	user_id: number
	firstname: string
	lastname: string
	email: string
}

export type Cart = {
	cart_id: number
	user_id: number
}

export type ItemType = {
	item_type_id: number
	name: string
}

export type Item = {
	item_id: number
	name: string
	price: number
	quantity: number
	quantityAsked?: number
	image_url: string
	item_type_id: number
	item_type_name: string
}

export type CartItem = {
	item_id: number
	name: string
	price: number
	totalPrice: number
	quantityAsked: number
	totalQuantity: number
	image_url: string
}


export type FlashMessage = {
	flash_message_id: number
  message: string
  color: string | undefined
}