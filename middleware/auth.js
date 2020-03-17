export default function({ store, route, redirect }) {
    console.log(arguments)
  if (store.state.token && route.path === "/login") {
    return redirect("/");
  }
}
