export default function({ store, route, redirect }) {
  if (store.state.token && route.path === "/login") {
    return redirect("/");
  }
}
