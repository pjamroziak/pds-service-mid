export interface Converter<F, T> {
    convert(model: F): T;
}