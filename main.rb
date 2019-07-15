#!/usr/bin/ruby
# FlickrAPIアクセス用

require 'open-uri'
require 'json'
require 'securerandom'

# 標準入力からAPIKEYを読む
API_KEY = gets.chomp

# FlickrAPIへのアクセス
query_arr = [
	["api_key", API_KEY],
	["method", "flickr.photos.search"],
	["tags", "kyoto"],
	["min_taken_date", "2016-01-01"],
	["max_taken_date", "2018-12-31"],
	["has_geo", 1],
	["extras", "geo,url_h,date_taken,owner_name,description"],
	["format", "json"],
	["nojsoncallback", 1]
]

uri = URI.parse("https://api.flickr.com/services/rest")
uri.query = URI.encode_www_form(query_arr.to_h)
puts "リクエストURL: " + uri.to_s

# リクエストを一時ファイルに保存する
File.open("tmp.json", "w+b") do |output|
	output.write(URI.open(uri.to_s).read)
end

# JSONファイルを読み込み、geojsonに変換する
source = JSON.load(File.open("./tmp.json"))

hash = Hash.new
hash["type"] = "FeatureCollection"
hash["features"] = Array.new

pin_color = "#FF00FF"

source["photos"]["photo"].each do |photo|
	tmp = Hash.new
	tmp["type"] = "Feature"
	tmp["properties"] = {
		"title": photo["id"],
		"description": photo["datetaken"],
		"marker-color": pin_color,
		"marker-size": "medium",
		"marker-symbol": "",

		"flickr-metadata": {
			"id": photo["id"],
			"owner": photo["owner"],
			"title": photo["title"],
			"datetaken": photo["datetaken"],
			"url_h": photo["url_h"],
			"height_h": photo["height_h"],
			"width_h": photo["width_h"],
			"description": photo["description"]["content"],
			"owner_name": photo["owner_name"]
		}
	}
	tmp["geometry"] = {
		"type": "Point",
		"coordinates": [ photo["longitude"], photo["latitude"] ]
	}
	hash["features"].push(tmp)
end

output_json = JSON.pretty_generate(hash)

# ダウンロードしたJSONを保存する
file_name = SecureRandom.urlsafe_base64(8)
File.open("docs/geojson/#{file_name}.geojson", "w+b") do |output|
	output.write(output_json)
end

system("bash upload_to_github.bash #{file_name}")

=begin
# ページを表示する
puts <<EOF
Content-type: text/html

<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="UTF-8"/>
</head>
<body>
	<p>#{"http://uploads.torisfactory.com/deploy/geojson_test/index.html?q=" + file_name}</p>
</body>
</html>
EOF

=end
