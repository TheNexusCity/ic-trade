import { C as k, A as g, t as x, l as P, P as A, d as v, a as D } from "./App.b9b1ee39.js";
import "react";
const T = async (t) => {
  const { canisterId: o, agent: d, paths: r } = t, c = [...new Set(r)], a = c.map((e) => f(e, o)), n = /* @__PURE__ */ new Map(), b = c.map((e, l) => (async () => {
    var u;
    try {
      const i = await d.readState(o, {
        paths: [a[l]]
      }), s = (await k.create({
        certificate: i.certificate,
        rootKey: d.rootKey,
        canisterId: o
      })).lookup(f(c[l], o));
      if (!s)
        console.warn(`Expected to find result for path ${e}, but instead found nothing.`), typeof e == "string" ? n.set(e, null) : n.set(e.key, null);
      else
        switch (e) {
          case "time": {
            n.set(e, p(s));
            break;
          }
          case "controllers": {
            n.set(e, h(s));
            break;
          }
          case "module_hash": {
            n.set(e, w(s));
            break;
          }
          case "candid": {
            n.set(e, new TextDecoder().decode(s));
            break;
          }
          default:
            if (typeof e != "string" && "key" in e && "path" in e)
              switch (e.decodeStrategy) {
                case "raw":
                  n.set(e.key, s);
                  break;
                case "leb128": {
                  n.set(e.key, y(s));
                  break;
                }
                case "cbor": {
                  n.set(e.key, m(s));
                  break;
                }
                case "hex": {
                  n.set(e.key, w(s));
                  break;
                }
                case "utf-8":
                  n.set(e.key, E(s));
              }
        }
    } catch (i) {
      if (!((u = i == null ? void 0 : i.message) === null || u === void 0) && u.includes("Invalid certificate"))
        throw new g(i.message);
      typeof e != "string" && "key" in e && "path" in e ? n.set(e.key, null) : n.set(e, null), console.group(), console.warn(`Expected to find result for path ${e}, but instead found nothing.`), console.warn(i), console.groupEnd();
    }
  })());
  return await Promise.all(b), n;
}, f = (t, o) => {
  const d = new TextEncoder(), r = (a) => new DataView(d.encode(a).buffer).buffer, c = new DataView(o.toUint8Array().buffer).buffer;
  switch (t) {
    case "time":
      return [r("time")];
    case "controllers":
      return [r("canister"), c, r("controllers")];
    case "module_hash":
      return [r("canister"), c, r("module_hash")];
    case "subnet":
      return [r("subnet")];
    case "candid":
      return [r("canister"), c, r("metadata"), r("candid:service")];
    default:
      if ("key" in t && "path" in t)
        if (typeof t.path == "string" || t.path instanceof ArrayBuffer) {
          const a = t.path, n = typeof a == "string" ? r(a) : a;
          return [r("canister"), c, r("metadata"), n];
        } else
          return t.path;
  }
  throw new Error(`An unexpeected error was encountered while encoding your path for canister status. Please ensure that your path, ${t} was formatted correctly.`);
}, w = (t) => x(t), y = (t) => P(new A(t)), m = (t) => v(t), E = (t) => new TextDecoder().decode(t), p = (t) => {
  const o = y(t);
  return new Date(Number(o / BigInt(1e6)));
}, h = (t) => {
  const [o, ...d] = m(t);
  return d.map((r) => D.fromUint8Array(new Uint8Array(r)));
};
export {
  f as encodePath,
  T as request
};
