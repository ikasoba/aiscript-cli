# Fs:readTextFile(path: str): str
ファイルシステムからファイルを取得

# Fs:writeTextfile(path: str, text: str): str
ファイルシステムのファイルを引数のtextで上書き

# Fs:readDir(path: str): arr\<obj>
ファイルシステムのフォルダの内容を取得

返される配列は以下の内容を持っている
```
{
  is_directory: bool
  is_file: bool
  is_symlink: bool
  name: str
}
```

# Fs:remove(path: str)
ファイルシステム内のフォルダやファイルを消す

# Web:fetch(url: str, options: str): any
ネットからデータを取ってきたりする

詳しくはこれ https://developer.mozilla.org/ja/docs/Web/API/fetch