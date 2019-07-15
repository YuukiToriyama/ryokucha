# Usage
## 引数の指定のしかた
```bash
./main.rb -k [APIキー] -t [検索条件に含めたいタグ] --min-taken-date [撮影日時の下限] --max-taken-date [撮影日時の上限]

./main.rb -k $(cat api_key) -t "kyoto" --min-taken-date "2019-01-01" --max-taken-date "2019-03-01"
```

例えば上の例の三行めのようにオプションを指定すると、Flickrにジオタグ付きで投稿された画像のうち、`kyoto`のタグを持ち、なおかつ撮影日時が2019年1月1日から3月1日までの間の写真だけが表示されます。


## 用意すべきもの
- api\_key
	- `main.rb`でFlickrにアクセスする際必要です。
	- Flickrのサイトで開発者登録をするともらえます。
	- [このサイト](https://qiita.com/Saayaman/items/a3066697a108a7e7fc39)を参考にAPIKEYを取得してください。
	- `-k`オプションあるいは`--api-key`オプションにAPIKEYを指定してください。
		- `cat api_key | xargs -I@ ruby main.rb --api-key @`
- プレビューページ(`docs/index.html`)を動かすためのgithubリポジトリ
	- CGIに書き換えるのが面倒だったので、flickrとの通信はローカルで行い、整形したgeojsonを`git`コマンドを使って自分のリポジトリにその都度アップする方式を取っています。
- gitコマンドのインストール
	- `upload_to_github.bash`には作成したgeojsonファイルを自分のgithubリポジトリにアップロードするためのスクリプトが組まれています。
	- このシェルスクリプトは`main.rb`から呼び出して使っていますが、`git`コマンドがインストールされていないと動きません。
	- また、毎回ユーザ名とパスワードを入力するのは面倒なので、ローカルとgithubの間のssh設定を行なっておくと良いです。
		- [参考ページ](https://qiita.com/shizuma/items/2b2f873a0034839e47ce)

- Ruby環境
	- 1.8系だとJSONをパースするやつが標準ライブラリに入ってないので動きません。
		- 別途gemでjsonライブラリを入れるか1.9以上にする必要あり

- その他
	- あとFirefox入ってないとページを開くことができません。
	- その場合はアドレスをコピペして自分のブラウザで開いてください。
