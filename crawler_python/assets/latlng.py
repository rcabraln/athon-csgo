from bs4 import BeautifulSoup, element
import requests
import time


def LatLng(ativo):
    #  nova busca, informações da Wikipedia quanto a localização não são confiáveis
    time.sleep(6)
    url_google = ('https://www.google.com/search?q=latitude.to+'
                  + ativo.findAll('td')[1].findAll('a')[0].text + '+,+' + '.+' + 'Arena+'
                  + ativo.findAll('td')[0].findAll('a')[0].text + '+,+'
                  + ativo.findAll('td')[0].findAll('a')[0]['title']
                  + '+Latitude+e+Longitude')
    subpag_google = requests.get(url_google)
    soup_google = BeautifulSoup(subpag_google.content, "html.parser").findAll('a')

    url_latlng = [href['href'] for href in soup_google
                  if ('http' in href['href'] and 'latitude.to' in href['href'] and not 'google' in href['href'])
                  or ('maps.google.com/maps?' in href['href'])]
    lat = '0'
    lng = '0'
    for href in url_latlng:
        if len(lat) == 0 or float(lat.strip()) == 0:
            # origem vindo o latitude.to
            if 'latitude.to' in href and not 'google' in href:
                subpag_latitude_to = requests.get(href[7:])
                soup_latitude_to = BeautifulSoup(subpag_latitude_to.content,
                                                 "html.parser").findAll('title')[0].text
                lat = soup_latitude_to[
                      soup_latitude_to.lower().find('latitude:') + 10: soup_latitude_to.lower().find('longitude:') - 1]
                lng = soup_latitude_to[soup_latitude_to.lower().find('longitude:') + 10:].strip()
            else:
                # origem vindo o Google Maps
                subpag_google_maps = requests.get(href)
                try:
                    soup_google_maps = [html for html in BeautifulSoup(subpag_google_maps.content, "html.parser") if type(html) not in [element.Doctype, element.NavigableString]][0].text
                except:
                    soup_google_maps = ''

                for i in range(-9, 10, 1):
                    if len(lat) == 0 or float(lat.strip()) == 0:
                        if soup_google_maps.find('[null,null,{}'.format(str(i))) > 0:
                            latlng = soup_google_maps[soup_google_maps.find('[null,null,{}'.format(str(i))):]
                            latlng = latlng[latlng.find('[null,null,') + 11:latlng.find(']')]

                            lat = latlng[:latlng.find(',')]
                            lng = latlng[latlng.find(',') + 1:]

    return lat, lng