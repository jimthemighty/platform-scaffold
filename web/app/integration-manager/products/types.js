import * as Runtypes from 'runtypes'

export const Nullable = (type) => Runtypes.Union(type, Runtypes.Null, Runtypes.Undefined)

const URL = Runtypes.String
const Key = Runtypes.String
const Currency = Runtypes.String
const Measure = Runtypes.String

// Text for the user
const Text = Runtypes.String
// Identifiers for the program
const Identifier = Runtypes.String

const Link = Runtypes.Record({
    href: URL,
    text: Text
}).And(Runtypes.Optional({
    title: Text
}))

const ImageSize = Runtypes.Record({
    height: Measure,
    width: Measure
})

const Image = Runtypes.Record({
    alt: Text,
    src: URL
}).And(Runtypes.Optional({
    zoomSrc: URL,
    thumbnailSrc: URL,
    caption: Nullable(Text),
    size: ImageSize,
    isMain: Runtypes.Boolean
}))

const Option = Runtypes.Record({
    value: Identifier,
    label: Text
})

const VariationCategory = Runtypes.Record({
    id: Identifier,
    label: Text,
    values: Runtypes.Array(Option)
})

const Variation = Runtypes.Record({
    id: Identifier,
    values: Runtypes.Dictionary(Identifier, Identifier)
})

const Product = Runtypes.Record({
    id: Identifier,
    title: Text,
    price: Currency,
    href: URL,
    thumbnail: Image,
    images: Runtypes.Array(Image)
}).And(Runtypes.Optional({
    description: Text,
    variationCategories: Runtypes.Array(VariationCategory),
    variations: Runtypes.Array(Variation)
}))


export const Products = Runtypes.Dictionary(Product, Key)

export const ProductUIData = Runtypes.Record({
    breadcrumbs: Runtypes.Array(Link),
    itemQuantity: Runtypes.Number,
    ctaText: Runtypes.String
})
