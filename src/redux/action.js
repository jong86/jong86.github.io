export default function action(type, options) {
  return {
    type: type,
    ...options
  }
}
