import React, { useState } from 'react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Style, Icon as IconStyle } from 'ol/style';
import type Map from 'ol/Map';

interface SearchFunProps {
  map: Map | null; // map 객체를 prop으로 받음
  onClose: () => void;
}

export default function SearchFun({ map, onClose }: SearchFunProps) {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = async () => {
    if (!searchKeyword) return;

    try {
      const res = await axios.get('http://183.100.244.17:8080/api/vworld/search', {
        params: { query: searchKeyword },
      });

      const data = res.data.response.result.items;
      if (!data || data.length === 0) {
        alert('검색 결과가 없습니다.');
        return;
      }

      const markerSource = new VectorSource();
      const features = data.map((item: any) => {
        const x = parseFloat(item.point.x);
        const y = parseFloat(item.point.y);

        const feature = new Feature({
          geometry: new Point([x, y]),
          name: item.title,
        });

        feature.setStyle(
          new Style({
            image: new IconStyle({
              src: '/marker.png',
              scale: 0.1,
              anchor: [0.5, 1],
            }),
          })
        );

        return feature;
      });

      markerSource.addFeatures(features);

      const markerLayer = new VectorLayer({
        source: markerSource,
        zIndex: 1000,
      });

      map?.addLayer(markerLayer);

      // 첫 번째 검색 결과 위치로 이동
      const firstCoord: [number, number] = [
        parseFloat(data[0].point.x),
        parseFloat(data[0].point.y),
      ];

      map?.getView().animate({
        center: firstCoord,
        zoom: 15,
        duration: 600,
      });

      onClose();
    } catch (err) {
      console.error(err);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="ol-search-wrapper">
      <div className="flex flex-row justify-between">
        <Typography variant="h6">위치 조회</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <TextField
        sx={{ width: '80%', margin: 'auto' }}
        size="small"
        placeholder="장소 검색"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <Button
        sx={{ width: '80%', margin: 'auto', mt: 1 }}
        variant="contained"
        size="small"
        onClick={handleSearch}
      >
        검색
      </Button>
    </div>
  );
}
