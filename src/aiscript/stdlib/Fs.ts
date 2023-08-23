import { utils, values } from "@syuilo/aiscript/";

export const FsLib = {
  "Fs:readTextFile": values.FN_NATIVE(async ([path]) => {
    utils.assertString(path);
    return values.STR(await Deno.readTextFile(path.value));
  }),
  "Fs:writeTextFile": values.FN_NATIVE(async ([path, text]) => {
    utils.assertString(path);
    utils.assertString(text);
    await Deno.writeTextFile(path.value, text.value);

    return values.NULL;
  }),
  "Fs:readDir": values.FN_NATIVE(async ([path]) => {
    utils.assertString(path);
    const entries = [];

    for await (const item of Deno.readDir(path.value)) {
      entries.push(values.OBJ(
        new Map<string, values.Value>([
          ["is_directory", values.BOOL(item.isDirectory)],
          ["is_file", values.BOOL(item.isFile)],
          ["is_symlink", values.BOOL(item.isSymlink)],
          ["name", values.STR(item.name)],
        ]),
      ));
    }

    return values.ARR(entries);
  }),
  "Fs:remove": values.FN_NATIVE(async ([path]) => {
    utils.assertString(path);
    await Deno.remove(path.value, { recursive: true });

    return values.NULL;
  }),
};
