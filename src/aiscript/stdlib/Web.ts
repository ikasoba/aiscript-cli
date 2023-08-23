import { utils, values } from "@syuilo/aiscript/";

export const createHeaders = (headers: Headers) =>
  values.OBJ(
    new Map<string, values.Value>([
      [
        "append",
        values.FN_NATIVE(([name, value]) => {
          utils.assertString(name);
          utils.assertString(value);

          headers.append(name.value, value.value);
        }),
      ],
      [
        "delete",
        values.FN_NATIVE(([name]) => {
          utils.assertString(name);

          headers.delete(name.value);
        }),
      ],
      [
        "get",
        values.FN_NATIVE(([name]) => {
          utils.assertString(name);

          return utils.jsToVal(headers.get(name.value));
        }),
      ],
      [
        "set",
        values.FN_NATIVE(([name, value]) => {
          utils.assertString(name);
          utils.assertString(value);

          headers.set(name.value, value.value);
        }),
      ],
      [
        "has",
        values.FN_NATIVE(([name]) => {
          utils.assertString(name);

          return values.BOOL(headers.has(name.value));
        }),
      ],
      [
        "getSetCookie",
        values.FN_NATIVE(() => {
          return values.ARR(headers.getSetCookie().map((x) => values.STR(x)));
        }),
      ],
    ]),
  );

export const createResponse = (res: Response): values.VObj =>
  values.OBJ(
    new Map<string, values.Value>([
      ["headers", createHeaders(res.headers)],
      ["ok", values.BOOL(res.ok)],
      ["redirected", values.BOOL(res.redirected)],
      ["status", values.NUM(res.status)],
      ["statusText", values.STR(res.statusText)],
      ["type", values.STR(res.type)],
      ["url", values.STR(res.url)],
      ["body_used", values.BOOL(res.bodyUsed)],
      [
        "clone",
        values.FN_NATIVE(() => {
          return createResponse(res.clone());
        }),
      ],
      [
        "text",
        values.FN_NATIVE(async () => {
          return values.STR(await res.text());
        }),
      ],
      [
        "json",
        values.FN_NATIVE(async () => {
          return utils.jsToVal(await res.json());
        }),
      ],
    ]),
  );

export const WebLib = {
  "Web:fetch": values.FN_NATIVE(async ([url, option]) => {
    utils.assertString(url);
    utils.assertObject(option);

    const res = await fetch(url.value, utils.valToJs(option));

    return createResponse(res);
  }),
};
