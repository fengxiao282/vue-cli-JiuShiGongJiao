// Weather API sample javascript code
// Requires: jQuery and crypto-js (v3.1.9)
// 
// Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.
// Yahoo weather api
import axios from 'axios'
import CryptoJS from 'crypto-js'

const getWeather = function (location, app_id, consumer_key, consumer_secret) {
        let url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss'
        let method = 'GET'
        let concat = '&'
        let query = { 'location': location, 'format': 'json', 'u': 'c' }
        let oauth = {
            'oauth_consumer_key': consumer_key,
            'oauth_nonce': Math.random().toString(36).substring(2),
            'oauth_signature_method': 'HMAC-SHA1',
            'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
            'oauth_version': '1.0'
        }

        let merged = {}

        Object.assign(merged, query, oauth)
        // Note the sorting here is required
        var merged_arr = Object.keys(merged).sort().map(function (k) {
            return [k + '=' + encodeURIComponent(merged[k])]
        })
        var signature_base_str = method
            + concat + encodeURIComponent(url)
            + concat + encodeURIComponent(merged_arr.join(concat))

        var composite_key = encodeURIComponent(consumer_secret) + concat
        var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key)
        var signature = hash.toString(CryptoJS.enc.Base64)

        oauth['oauth_signature'] = signature
        var auth_header = 'OAuth ' + Object.keys(oauth).map(function (k) {
            return [k + '="' + oauth[k] + '"']
        }).join(',')

        return async function () {
            try {
                let data = await axios({
                    method: 'GET',
                    url: url,
                    params: query,
                    headers: {
                        'Authorization': auth_header,
                        'Yahoo-App-Id': app_id
                    },
                    timeout: 10000,
                })
                return data
            } catch (error) {
                console.error(error)
            }
        }
}

export default getWeather