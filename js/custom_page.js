let ip_location;
let loading = false;
let referredBy;
let customInvite;
let isMobile = false
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
	// true for mobile device
	isMobile = true;
} else {
	// false for not mobile device
	isMobile = false;
}

const valid_country = [
	"AL",
	"AT",
	"BA",
	"BE",
	"BG",
	"BY",
	"HR",
	"CY",
	"CZ",
	"DK",
	"EE",
	"FI",
	"FR",
	"DE",
	"GR",
	"HU",
	"IS",
	"IE",
	"IT",
	"XK",
	"LV",
	"LT",
	"LU",
	"MT",
	"MD",
	"ME",
	"MK",
	"NO",
	"NL",
	"PL",
	"PT",
	"RO",
	"RS",
	"SK",
	"SI",
	"ES",
	"SE",
	"CH",
	"RU",
	"UA",
	"GB",
	"TR",
	"CA",
	"AR",
	"BR",
	"KY",
	"CL",
	"CO",
	"CR",
	"EC",
	"MX",
	"PE",
	"UY",
	"AU",
	"KZ",
	"KG",
	"NZ",
	"KR",
	"SG",
	"JP",
	"IL",
	"UZ",
	"AE",
	"SA",
	"ZA",
	"CI",
	"SC",
	"HK",
	"MN",
	"KW",
	"BN",
	"MV",
	"KH",
	"BZ",
	"TC",
	"TT",
	"TW",
	"BM",
	"MY",
	"VG",
	"AI",
	"BS",
	"DO",
	"MO",
	"IN",
	"NG",
	"PK",
	"MA",
	"JM",
	"ID",
	"PH",
	"TH",
	"VN",
	"US"
];
let testFlight = true;

const sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};

const marqueePage = () => {
	const pathName = window.location.pathname;
	if (pathName.startsWith("/new") || pathName.startsWith("/de/new")) {
		return true;
	} else {
		return false;
	}
};
const tiktokPage = () => {
	const pathName = window.location.pathname;
	if (pathName.startsWith("/tiktok")) {
		return true;
	} else {
		return false;
	}
};
const getMobileOperatingSystem = () => {
	var userAgent =
		window.navigator.userAgent ||
		window.navigator.vendor ||
		window.window.opera;
	if (
		userAgent.match(/iPad/i) ||
		userAgent.match(/iPhone/i) ||
		userAgent.match(/iPod/i)
	) {
		return "ios";
	} else if (userAgent.match(/Android/i)) {
		return "android";
	} else {
		return "unknown";
	}
};

const closeBanner = () => {
	let mobileBanner = document.getElementById("divMobileBanner");
	mobileBanner.style.display = "none";
};
const getCookieValue = (name) => {
	const regex = new RegExp(`(^| )${name}=([^;]+)`)
	const match = document.cookie.match(regex)
	if (match) {
	return match[2]
	}
}

const setCookieValue = (name, value) => {
	const cookies = document.cookie

	document.cookie = name + "=" + value + "; path=/";

}

const cookiesAccepted = () => {
	let cookieBanner = document.getElementById("divCookieBanner");
	if (cookieBanner) {
		cookieBanner.style.display = 'none';
		cookieBanner.style.visibility = 'hidden';
	}

	let cookieConsent = getCookieValue('cookieConsent')

	if (cookieConsent !== 'true') {
		setCookieValue('cookieConsent', 'true')
	}

	// Inject Quora pixel
	!function(q,e,v,n,t,s) {
		if(q.qp) return; 
		n=q.qp=function() {
			n.qp ? n.qp.apply(n,arguments) : n.queue.push(arguments);
		};
		n.queue=[];
		t=document.createElement(e);
		t.async=!0;t.src=v; 
		s=document.getElementsByTagName(e)[0]; 
		s.parentNode.insertBefore(t,s);
	} (window, 'script', 'https://a.quora.com/qevents.js');
	qp('init', '1d2046b63b4648f5910da20eb3a2806a');
	qp('track', 'ViewContent');
	
	// Activate Google Advertising Features
	try {
		if (this.$gtag) {
			this.$gtag.set('anonymize_ip', false);
		}

	} catch {}

	try {
		if (this.$gtag) {
			this.$gtag.set('allow_google_signals', true);
		}
	} catch {}

	// load reddit pixel
	try {

		// load the reddit pixel SDK
		if (!document.getElementById('script_reddit_pixel')) {
			const pixelScript = `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_en0sdd3j80ju');rdt('track', 'PageVisit');`

			const scriptElement = document.createElement('script');
			scriptElement.setAttribute('id', 'script_reddit_pixel');
			scriptElement.type = 'text/javascript';
			scriptElement.text = pixelScript;
			document.head.appendChild(scriptElement);
		}            
	} catch {}
}
const checkCookieConsent = () => {

	const cookies = document.cookie

	let cookieConsent = getCookieValue('cookieConsent')

	if (cookieConsent === 'true') {
		cookiesAccepted()
	} else {

		let location = window.location.href;
		let locale = 'en';
		if (location.includes('/de/')) {
			locale = 'de';
		} else if (location.includes('/ru/')) {
			locale = 'ru';
		}

		let cookieBanner = document.getElementById("divCookieBanner");
		if (!cookieBanner) {
			let html = `<button type="button" class="delete" onclick="cookiesAccepted()"></button> <div class="media"><!----> <div class="media-content"><span class="media-text">We use cookies 🍪 to build better products. Close to accept or <a href="/cookie-policy" target="_blank">Learn More</a>.</span><button class="cookie-button" style="margin-top: 5px; width: 100%;" onclick="cookiesAccepted()"> Got It </button></div></div>`
			if (locale === 'ru') {
				html = `<button type="button" class="delete" onclick="cookiesAccepted()"></button> <div class="media"><!----> <div class="media-content"><span class="media-text">Мы используем файлы cookie 🍪, чтобы создавать лучшие продукты. Закройте окно, чтобы их принять или <a href="/cookie-policy" target="_blank">узнайте более подробную информацию</a>.</span><button class="cookie-button" style="margin-top: 5px; width: 100%;" onclick="cookiesAccepted()"> Все ясно </button></div></div>`
			}

			if (locale === 'de') {
				html = `<button type="button" class="delete" onclick="cookiesAccepted()"></button> <div class="media"><!----> <div class="media-content"><span class="media-text">Wir verwenden Cookies 🍪, um bessere Produkte zu entwickeln. Schließen Sie die Annahme oder  <a href="/cookie-policy" target="_blank">Erfahren Sie mehr</a>.</span><button class="cookie-button" style="margin-top: 5px; width: 100%;" onclick="cookiesAccepted()"> Verstanden </button></div></div>`
			}

			
			const bannerElement = document.createElement("div");
			bannerElement.className = "cookie-banner"
			bannerElement.id = "divCookieBanner"
			bannerElement.innerHTML = html;
			document.body.insertBefore(bannerElement, document.body.lastChild);
		}
	}

}
const appBannerShow = (url) => {
	const affiliate_id = localStorage.getItem("affiliate_id") || 'website';
	let os = getMobileOperatingSystem();

	if (os == "ios" && testFlight) {
		os = "unknown";
	}

	let mobileBanner = document.getElementById("divMobileBanner");
	if (os !== "unknown" && !mobileBanner) {
		let banner = `<div
        id='divMobileBanner'
            class="mobileappbanner js_mobileappbanner ${
							os == "ios" ? "mobileappbanner-ios" : "mobileappbanner-android"
						}"
        >
            <a
                href="#"
                class="mobileappbanner_exit js_mobileappbanner_exit"
                aria-label="Close"
                onclick="closeBanner()"
            ></a>
            <img class="mobileappbanner_icon" src="/img/mobile_icon.png" />
            <div class="mobileappbanner_info has-text-left">
                <div>
                    <div class="mobileappbanner_info_title">
                    Morpher App
                    </div>
                    <div class="mobileappbanner_info_author">
                        Take on Wall Street with $1 
                    </div>
                    <div class="mobileappbanner_info_price">
                        ${
													os == "ios"
														? "FREE - In App Store"
														: "FREE - In Google Play"
												}
                    </div>
                </div>
            </div>
            <a
                href="${url}"
                class="mobileappbanner_button js_mobileappbanner_button"
                rel="noopener"
                aria-label="view"
                ><span class="mobileappbanner_button_label">View</span></a></div>`;

		const bannerElement = document.createElement("div");
		bannerElement.innerHTML = banner;
		document.body.insertBefore(bannerElement, document.body.firstChild);
	}
};

const checkLocation = async () => {
	try {
		if (loading) {
			let counter = 0;
			while (loading && counter < 50) {
				await sleep(100);
				counter += 1;
			}
		}
		loading = true;
		let ip_location = JSON.parse(localStorage.getItem("ip_location") || "{}");

		if (
			!ip_location ||
			!ip_location.timestamp ||
			ip_location.timestamp < Date.now() - 1000 * 60 * 60 * 24
		) {
			const response = await fetch(
				"https://api.morpher.com/v1/web/checkLocation/"
			);
			let country_code = await response.json();

			if (
				country_code &&
				country_code.ip_address &&
				country_code.country_code
			) {
				ip_location = {
					timestamp: Date.now(),
					country_code: country_code.country_code,
					ip_address: country_code.ip_address,
				};
			} else {
				ip_location = {
					timestamp: Date.now(),
					country_code: "unknown",
					ip_address: "unknown",
				};
			}

			localStorage.setItem("ip_location", JSON.stringify(ip_location));
		}

		loading = false;
		return ip_location;
	} catch (err) {
		console.log("err", err);
		loading = false;
		return { ip_address: "unknown", country_code: "unknown" };
	}
};

const updateRegisterURL = async () => {
	console.log('isMobile', isMobile)
	let url = 'https://morph.dynalinks.app/register';

	try {
		ip_location = await checkLocation();

		// Grab custom invite / referral from storage if on non-Airdrop page
		let referred_by = localStorage.getItem("airdrop_referred_by");
		const custom_invite = localStorage.getItem("airdrop_custom_invite");

		if (tiktokPage() && (!referred_by || referred_by !== "tiktok")) {
			referred_by = "tiktok";
		}

		const utm_source = localStorage.getItem("utm_source");
		const utm_medium = localStorage.getItem("utm_medium");
		const utm_campaign = localStorage.getItem("utm_campaign");
		const utm_term = localStorage.getItem("utm_term");
		const utm_content = localStorage.getItem("utm_content");
		const at_gd = localStorage.getItem("at_gd");
		const utm_referrer = localStorage.getItem("utm_referrer");
		const ref = localStorage.getItem("ref");
		const source_id = localStorage.getItem("source_id");
		const affiliate_referrer = localStorage.getItem("affiliate_referrer");
		const affiliate_id = localStorage.getItem("affiliate_id") || 'website';
		const affiliate_campaign = localStorage.getItem("affiliate_campaign");
		const affiliate_utm_source = localStorage.getItem("affiliate_utm_source");
		const affiliate_utm_medium = localStorage.getItem("affiliate_utm_medium");
		const affiliate_utm_campaign = localStorage.getItem("affiliate_utm_campaign");
		const affiliate_path = localStorage.getItem("affiliate_path");

		let urlWeb = "https://morpher.com/trade" + "/register";

		const affiliate_language = localStorage.getItem("affiliate_language");
		let affiliate_browser_language = localStorage.getItem("affiliate_browser_language");

		if (!affiliate_browser_language) {
			const browser_language = navigator.language || navigator.userLanguage; //no ?s necessary
			if (browser_language) {
				affiliate_browser_language = browser_language
			}
		}

		// url +=
		// 	"/?link=" +
		// 	("https://morpher.com/trade" || "https://morpher.com/trade") +
		// 	"/register";

		// Check for custom invites or referrals to generate registerURL
		if (customInvite || referredBy) {

			urlWeb += customInvite
				? "/?custom_invite=" + customInvite
				: "/?referred_by=" + referredBy;
		} else if (custom_invite || referred_by) {
			urlWeb += custom_invite
				? "/?custom_invite=" + custom_invite
				: "/?referred_by=" + referred_by;
		} else {
			urlWeb += "/?referred_by=";
		}

		if (utm_source) urlWeb += "&utm_source=" + utm_source;
		if (utm_medium) urlWeb += "&utm_medium=" + utm_medium;
		if (utm_campaign) urlWeb += "&utm_campaign=" + utm_campaign;
		if (utm_term) urlWeb += "&utm_term=" + utm_term;
		if (utm_content) urlWeb += "&utm_content=" + utm_content;
		if (at_gd) urlWeb += "&at_gd=" + at_gd;
		if (utm_referrer) urlWeb += "&utm_referrer=" + utm_referrer;
		if (ref) urlWeb += "&ref=" + ref;
		if (source_id) urlWeb += "&source_id=" + source_id;
		if (affiliate_referrer)
			urlWeb += "&affiliate_referrer=" + affiliate_referrer;
		if (affiliate_id) urlWeb += "&affiliate_id=" + affiliate_id;
		if (affiliate_campaign)
			urlWeb += "&affiliate_campaign=" + affiliate_campaign;
		if (affiliate_utm_source)
			urlWeb += "&affiliate_utm_source=" + affiliate_utm_source;
		if (affiliate_utm_medium)
			urlWeb += "&affiliate_utm_medium=" + affiliate_utm_medium;
		if (affiliate_utm_campaign)
			urlWeb += "&affiliate_utm_campaign=" + affiliate_utm_campaign;
		if (affiliate_path) urlWeb += "&affiliate_path=" + affiliate_path;

		if (affiliate_language)
			urlWeb += "&affiliate_language=" + affiliate_language;
		if (affiliate_browser_language)
			urlWeb += "&affiliate_browser_language=" + affiliate_browser_language;

		// url +=
		// 	"&apn=com.morpher.trade.beta&ibi=com.morpher.trade.beta&isi=6444658444&ius=morpher"; //&efr=1

		// remove the ifl once apple is live in app store

		if (
			ip_location &&
			ip_location.country_code &&
			valid_country.includes(ip_location.country_code.toUpperCase())
		) {
			testFlight = false;
		}

		// if (testFlight) {
		// 	// url += '&ifl=https://testflight.apple.com/join/bpqEWAq2';
		// 	url += "&ifl=" + urlWeb;
		// }

		let links = document.getElementsByTagName("a");
		console.log({urlWeb, url})
		if (links && links.length > 0) {
			for (var i = 0; i < links.length; i++) {
				const link = links[i];
				if (
					link.href.toLowerCase() == "https://www.morpher.com/trade/register" ||
					link.href.toLowerCase() ==
						"https://www.morpher.com/trade/register/" ||
					link.href.toLowerCase() == "https://morpher.com/trade/register/" ||
					link.href.toLowerCase() == "https://morpher.com/trade/register"
				) {
					if (isMobile)
						link.href = url;
					else
						link.href = urlWeb;
				}
				const appURL = new URL(link.href.toLowerCase());
				if (appURL.pathname.startsWith("/app_link")) {
					link.href = url;
				}
			}
		}
	} catch (err) {
		console.log("error in updateRegisterURL", err);
	}

	if (!tiktokPage()) appBannerShow(url);

};

const getStarted = () => {};
//  Custom campaign tracking
let affiliateSaved = false;
const saveAffiliateData = (event) => {
	try {
		if (!affiliateSaved || event) {
			affiliateSaved = true;
			const id = localStorage.getItem("affiliate_db_id");

			const affiliate_id = localStorage.getItem("affiliate_id") || 'website';
			const at_gd = localStorage.getItem("at_gd");
			const ref = localStorage.getItem("ref");
			const affiliate_campaign =
				localStorage.getItem("affiliate_campaign") || "";
			const affiliate_referrer =
				localStorage.getItem("affiliate_referrer") || "";
			const affiliate_utm_source = localStorage.getItem("affiliate_utm_source") || localStorage.getItem("utm_source") || "";
			const affiliate_utm_medium = localStorage.getItem("affiliate_utm_medium") || localStorage.getItem("utm_medium") || "";
			const affiliate_utm_campaign = localStorage.getItem("affiliate_utm_campaign") || localStorage.getItem("utm_campaign") || "";
			const affiliate_path = localStorage.getItem("affiliate_path") || "";
			const affiliate_language = localStorage.getItem("affiliate_language");
			let affiliate_browser_language = localStorage.getItem("affiliate_browser_language");
	
			if (!affiliate_browser_language) {
				const browser_language = navigator.language || navigator.userLanguage; //no ?s necessary
				if (browser_language) {
					affiliate_browser_language = browser_language
				}
			}

			if (ref) {
				fetch("https://api.morpher.com/v1/web/sendAnalytics", {
					method: "POST",
					body: JSON.stringify({
						event: "tapfiliate_click",
						data: {
							ref,
							id,
							source_id: localStorage.getItem("source_id"),
							referrer: affiliate_referrer,
							landing_page: window.location.href,
							user_agent: window.navigator.userAgent,
							event
						},
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}).then((result) => {
					try {
						result.json().then((json) => {
							if (json?.id) {
								localStorage.setItem('affiliate_db_id', json.id.toString())
							}
						} )
					} catch (err) {
						console.log("Error in saveAffiliateData", err);
					}
					affiliateSaved = true;
				});
			}

			if (affiliate_id || at_gd) {
				fetch("https://api.morpher.com/v1/web/sendAnalytics", {
					method: "POST",
					body: JSON.stringify({
						event: "affiliate_data",
						data: {
							affiliate_id,
							affiliate_campaign,
							affiliate_referrer,
							affiliate_utm_source,
							affiliate_utm_medium,
							affiliate_utm_campaign,
							affiliate_path,
							at_gd,
							ref,
							affiliate_language,
							id,
							affiliate_browser_language,
							event
						},
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}).then((result) => {
					try {
						result.json().then((json) => {
							if (json?.id) {
								localStorage.setItem('affiliate_db_id', json.id.toString())
							}
						} )
					} catch (err) {
						console.log("Error in saveAffiliateData", err);
					}
					affiliateSaved = true;
				});
			}
		}
	} catch (err) {
		console.log("Error in saveAffiliateData", err);
	}
	updateRegisterURL();
};

const parseQuery = (str) => {
	if (typeof str != "string" || str.length == 0) return {};
	var s = str.split("&");
	var s_length = s.length;
	var bit,
		query = {},
		first,
		second;
	for (var i = 0; i < s_length; i++) {
		bit = s[i].split("=");
		first = decodeURIComponent(bit[0]);
		if (first.length == 0) continue;
		if (first.charAt(0) == "?") first = first.substring(1);
		second = decodeURIComponent(bit[1]);
		if (typeof query[first] == "undefined") query[first] = second;
		else if (query[first] instanceof Array) query[first].push(second);
		else query[first] = [query[first], second];
	}
	return query;
};

const processQueryString = () => {
	try {
		const query = parseQuery(document.location.search);

		if (query.referred_by) {
			referredBy = query.referred_by.toLowerCase();
		}
		// Load the custom invite from the url parameters
		if (query.custom_invite) {
			customInvite = query.custom_invite.toLowerCase();
		}

		if (referredBy) {
			localStorage.setItem("airdrop_referred_by", referredBy);
			localStorage.removeItem("airdrop_custom_invite");
		}
		if (customInvite) {
			localStorage.setItem("airdrop_custom_invite", customInvite);
			localStorage.removeItem("airdrop_referred_by");
		}

		const utm_source = query.utm_source;
		const utm_medium = query.utm_medium;
		let utm_campaign = query.utm_campaign;
		const utm_term = query.utm_term;
		const utm_content = query.utm_content;
		const affiliate_language = query.affiliate_language
		let affiliate_browser_language = query.affiliate_browser_language

		if (!affiliate_browser_language) {
			const browser_language = navigator.language || navigator.userLanguage; //no ?s necessary
			if (browser_language) {
				affiliate_browser_language = browser_language
			}
		}
		if (utm_source || utm_medium || utm_campaign || utm_term || utm_content) {
			localStorage.setItem("utm_source", utm_source || "");
			localStorage.setItem("utm_medium", utm_medium || "");
			localStorage.setItem("utm_campaign", utm_campaign || "");
			if (query.at_gd && !utm_campaign) {
				utm_campaign = "adtraction";
			}

			localStorage.setItem("utm_term", utm_term || "");
			localStorage.setItem("utm_content", utm_content || "");
			if (affiliate_language) {
				localStorage.setItem("affiliate_language", affiliate_language || "");
			}
			if (affiliate_browser_language && !localStorage.getItem("affiliate_browser_language")) {
				localStorage.setItem("affiliate_browser_language", affiliate_browser_language || "");
			}
		}

		var referrer = document.referrer;
		if (referrer) {
			localStorage.setItem("utm_referrer", referrer);
		}
		if (query.aff_id) {
			const affiliate_id = localStorage.getItem("affiliate_id") || 'website';
			if (
				!affiliate_id ||
				affiliate_id.toLowerCase() !== query.aff_id.toLowerCase()
			) {
				affiliateSaved = false;
				localStorage.setItem("affiliate_id", query.aff_id);
				localStorage.setItem("affiliate_campaign", query.campaign || "");
				localStorage.setItem("affiliate_referrer", document.referrer || "");
				localStorage.setItem("affiliate_utm_source", utm_source || "");
				localStorage.setItem("affiliate_utm_medium", utm_medium || "");
				localStorage.setItem("affiliate_utm_campaign", utm_campaign || "");
				localStorage.setItem("affiliate_path", "/new");
				localStorage.setItem("at_gd", query.at_gd);
				if (affiliate_language) {
					localStorage.setItem("affiliate_language", affiliate_language || "");
				}
				if (affiliate_browser_language && !localStorage.getItem("affiliate_browser_language")) {
					localStorage.setItem("affiliate_browser_language", affiliate_browser_language || "");
				}
			}
		}

		if (query.at_gd) {
			const at_gd = localStorage.getItem("at_gd");
			if (!at_gd || at_gd.toLowerCase() !== query.at_gd.toLowerCase()) {
				affiliateSaved = false;
				localStorage.setItem("affiliate_id", query.aff_id);
				localStorage.setItem("at_gd", query.at_gd);
				localStorage.setItem("affiliate_campaign", query.campaign || "");
				localStorage.setItem("affiliate_referrer", document.referrer || "");
				localStorage.setItem("affiliate_utm_source", utm_source || "");
				localStorage.setItem("affiliate_utm_medium", utm_medium || "");
				localStorage.setItem("affiliate_utm_campaign", utm_campaign || "");
				localStorage.setItem("affiliate_path", "/new");
				if (affiliate_language) {
					localStorage.setItem("affiliate_language", affiliate_language || "");
				}
				if (affiliate_browser_language && !localStorage.getItem("affiliate_browser_language")) {
					localStorage.setItem("affiliate_browser_language", affiliate_browser_language || "");
				}
			}
		}
	} catch (err) {
		console.log("Error in processQueryString", err);
	}
	if (tiktokPage()) {
		localStorage.setItem("airdrop_referred_by", "tiktok");
		localStorage.setItem("affiliate_path", "/tiktok");
		localStorage.setItem("affiliate_id", "superjoi");
	}
	setTimeout(()=> {saveAffiliateData('click');}, 5000);
};

processQueryString();
checkCookieConsent();

const priceApi =
	"https://api.morpher.com/v1/web/markets?markets=STOCK_TSLA,CRYPTO_BTC,COMMODITY_BRENT,UNIQUE_BAYC,STOCK_PYPL,FOREX_EUR_USD,CRYPTO_MATIC,COMMODITY_XAU,UNIQUE_SUB,STOCK_NKE,STOCK_NVDA,CRYPTO_1INCH,STOCK_ABNB,STOCK_SHOP,CRYPTO_ETH,STOCK_COIN,STOCK_AAPL";

const buildCryptoMarquee = () => {
	const formatCurrency = (x) => {
		let num = Number(x).toFixed(2);
		return num.toLocaleString("en-US");
	};

	const formatPercent = (x) => {
		let num = Number(x).toFixed(2);
		num += "%";
		return num;
	};

	fetch(priceApi)
		.then((response) => response.json())
		.then((data) =>
			Object.keys(data).forEach((token) => {
				let movement = document.getElementById(token + "_MOVEMENT");
				let price = document.getElementById(token + "_PRICE");

				if (movement) {
					movement.innerText = formatPercent(data[token].change_percent);
					const parentDiv = movement.parentElement;
					let img;
					if (parentDiv) {
						img = parentDiv.childNodes[1];
					}
					if (Number(data[token].change_percent) >= 0) {
						movement.className = "bold-button-text-green";
						if (parentDiv) parentDiv.className = "growing";
						if (img) img.src = "/new/images/Vectors-Wrapper_1.svg";
					} else {
						movement.className = "bold-button-text-red";
						if (parentDiv) parentDiv.className = "falling";
						if (img) img.src = "/new/images/ic_arrow-down-16pt.svg";
					}
				}
				if (price) {
					price.innerText = formatCurrency(data[token].close);
				}
				return;
			})
		);
};

const getColor = (changePercent) => {
	if (parseInt(changePercent) > 0) {
		return "color: rgb(22, 206, 185)";
	} else {
		return "color: rgb(252, 10, 84)";
	}
};

if (marqueePage()) document.addEventListener("DOMContentLoaded", buildCryptoMarquee());

// MY JS

// MY JS END
