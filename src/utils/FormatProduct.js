export default function FormatProduct({ _id, image, name, color, size, quantity, inStock, price }) {
    return {
        key: _id,
        info: {
            imageUrl: image[0],
            name,
            color,
            size: `${size.width}x${size.height}x${size.depth}${size.unit}`,
        },
        amount: {
            quantity,
            inStock,
        },
        price,
    }
}