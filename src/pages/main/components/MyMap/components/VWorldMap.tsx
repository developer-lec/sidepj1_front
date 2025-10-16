import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { Button, Typography } from '@mui/material';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Icon as IconStyle, Stroke } from 'ol/style';
import '../../../../../assets/style/ol.scss';
import SearchFun from './SearchFun';

const APIKey = 'F61DC1AB-9A4C-3366-B81E-86B967884A67';
const defaultCenter: [number, number] = [127.12699896265298, 37.43921230285959];

const VWorldMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const [isOpenSearch, setIsOpenSearch] = useState(false);

  // 레이어 refs
  const baseLayerRef = useRef<TileLayer<XYZ> | null>(null);
  const satelliteLayerRef = useRef<TileLayer<XYZ> | null>(null);
  const midNightLayerRef = useRef<TileLayer<XYZ> | null>(null);

  // Canvas 최적화
  const setCanvasOptimization = (target: HTMLElement | null) => {
    if (!target) return;
    const canvas = target.querySelector('canvas') as HTMLCanvasElement | null;
    if (canvas) {
      canvas.style.imageRendering = 'auto';
      canvas.style.willChange = 'transform';
    }
  };

  // 지도 초기화
  useEffect(() => {
    if (!mapElement.current) return;

    // 지도 표출 형식 관련 (기본, 위성, 야간)
    const vworldBase = new TileLayer({
      source: new XYZ({
        url: `https://api.vworld.kr/req/wmts/1.0.0/${APIKey}/Base/{z}/{y}/{x}.png`,
      }),
      visible: true,
      zIndex: 1,
    });

    const vworldSatellite = new TileLayer({
      source: new XYZ({
        url: `https://api.vworld.kr/req/wmts/1.0.0/${APIKey}/Satellite/{z}/{y}/{x}.jpeg`,
      }),
      visible: false,
      zIndex: 1,
    });

    const vworldMidNight = new TileLayer({
      source: new XYZ({
        url: `https://api.vworld.kr/req/wmts/1.0.0/${APIKey}/midnight/{z}/{y}/{x}.png`,
      }),
      visible: false,
      zIndex: 1,
    });

    baseLayerRef.current = vworldBase;
    satelliteLayerRef.current = vworldSatellite;
    midNightLayerRef.current = vworldMidNight;

    const center = fromLonLat(defaultCenter);
    const view = new View({
      center,
      zoom: 14.5,
      projection: 'EPSG:3857',
      maxZoom: 19,
      minZoom: 5,
    });

    mapRef.current = new Map({
      target: mapElement.current,
      layers: [vworldBase, vworldSatellite, vworldMidNight],
      view,
      controls: defaultControls({ zoom: false, rotate: false, attribution: false }),
    });

    setCanvasOptimization(mapElement.current);
    setTimeout(() => setCanvasOptimization(mapElement.current), 1000);
    mapRef.current.once('rendercomplete', () => setCanvasOptimization(mapElement.current));

    return () => mapRef.current?.setTarget(undefined);
  }, []);

  // 지도 타입 변경
  const handleChangeMap = (selectedMap: string) => {
    if (baseLayerRef.current && satelliteLayerRef.current && midNightLayerRef.current) {
      baseLayerRef.current.setVisible(false);
      satelliteLayerRef.current.setVisible(false);
      midNightLayerRef.current.setVisible(false);
      if (selectedMap === 'satellite') satelliteLayerRef.current.setVisible(true);
      else if (selectedMap === 'midNight') midNightLayerRef.current.setVisible(true);
      else baseLayerRef.current.setVisible(true);
    }
  };

  return (
    <div className="w-full h-full">
      {/* 지도 */}
      <div ref={mapElement} style={{ width: '100vw', height: '100vh' }}></div>

      {/* 레이어 버튼 */}
      <div className="ol-changeLayer-wrapper">
        <Button onClick={() => handleChangeMap('midNight')}>
          <img src="./midnight.png" width={25} />
        </Button>
        <Button onClick={() => handleChangeMap('satellite')}>
          <img src="./satellite.png" width={25} />
        </Button>
        <Button onClick={() => handleChangeMap('none')}>
          <img src="./none.png" width={25} />
        </Button>
      </div>

      {/* 지도 제어 버튼 */}
      <div className="ol-MapControl-wrapper">
        <Button onClick={() => setIsOpenSearch(true)}>
          <Typography variant="subtitle1">위치 검색</Typography>
        </Button>
        <Button onClick={() => handleChangeMap('satellite')}>
          <Typography variant="subtitle1">위치 추가</Typography>
        </Button>
        <Button onClick={() => handleChangeMap('none')}>
          <Typography variant="subtitle1">내 위치 조회</Typography>
        </Button>
      </div>

      {/* 검색 팝업 */}
      {isOpenSearch && <SearchFun map={mapRef.current} onClose={() => setIsOpenSearch(false)} />}
    </div>
  );
};

export default VWorldMap;
