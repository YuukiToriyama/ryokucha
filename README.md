# Usage
## 用意すべきもの
- api\_key
	- `main.rb`でFlickrにアクセスする際必要です。
	- Flickrのサイトで開発者登録をするともらえます。
	- [このサイト](https://qiita.com/Saayaman/items/a3066697a108a7e7fc39)を参考にAPIKEYを取得してください。
	- main.rbに標準入力からAPIKEYを流し込むとFlickrとの通信が始まります。
		- `cat api_key | ruby main.rb`
- プレビューページ(`docs/index.html`)を動かすためのgithubリポジトリ
	- CGIに書き換えるのが面倒だったので、flickrとの通信はローカルで行い、整形したgeojsonを`git`コマンドを使って自分のリポジトリにその都度アップする方式を取っています。
- gitコマンドのインストール
	- `upload_to_github.bash`には作成したgeojsonファイルを自分のgithubリポジトリにアップロードするためのスクリプトが組まれています。
	- このシェルスクリプトは`main.rb`から呼び出して使っていますが、`git`コマンドがインストールされていないと動きません。
	- また、毎回ユーザ名とパスワードを入力するのは面倒なので、ローカルとgithubの間のssh設定を行なっておくと良いです。
		- [参考ページ](https://qiita.com/shizuma/items/2b2f873a0034839e47ce)

- ruby
