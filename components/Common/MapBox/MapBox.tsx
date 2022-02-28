import { HTMLAttributes, useEffect, useState } from "react";
import { Map } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";

interface MapBoxType extends HTMLAttributes<HTMLDivElement> {
  address: string;
}

const zipCodeRegex =
  "(\\d{5}([ \\-]\\d{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\\d{1}[A-Z]{1}[ \\-]\\d{1}[A-Z]{1}\\d{1}$)";
export const MapBox = ({ address }: MapBoxType) => {
  const [latLng, setLatLng] = useState<[number, number]>([35.59, -82.55]);
  const [lastSuccessfulAddress, setLastSuccessfulAddress] = useState(address);
  const fetchAddress = async () => {
    let addressToSearch = address.slice(address.length - 5, address.length);

    try {
      const fetched = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressToSearch}.json?&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}&country=us`
      );

      const { features } = await fetched.json();

      if (features.length) {
        const { center } = features[0];
        setLastSuccessfulAddress(address);
        return setLatLng(center.reverse()); //mapbox-gl and pigeon-maps are flipped lat/lng
      }
    } catch (e) {
      console.log("Could not correctly fetch the address", e);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [address]);
  return (
    <div data-testid={`modal-address-${lastSuccessfulAddress}`}>
      <Map
        height={336}
        defaultCenter={[35.59, -82.55]}
        center={latLng}
        defaultZoom={11}
        provider={osm}
      />
    </div>
  );
};
