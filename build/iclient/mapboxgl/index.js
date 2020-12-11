/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
export {
  SuperMap,
  setCORS,
  isCORS,
  setRequestTimeout,
  getRequestTimeout,
  FetchRequest,
  KeyServiceParameter,
  SecurityManager,
  ServerInfo,
  TokenServiceParameter,
  QueryByBoundsParameters,
  QueryByDistanceParameters,
  QueryByGeometryParameters,
  QueryBySQLParameters,
  QueryParameters,
  GetFeaturesByBoundsParameters,
  GetFeaturesByBufferParameters,
  GetFeaturesByGeometryParameters,
  GetFeaturesByIDsParameters,
  GetFeaturesBySQLParameters,
  FilterParameter,
  GetFeaturesParametersBase,
  GetFeaturesServiceBase,
  getMeterPerMapUnit,
  ServerFeature,
  Collection,
  Curve,
  GeoText,
  LinearRing,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  GeometryPoint,
  Polygon,
  Rectangle,
  StringExt,
  NumberExt,
  FunctionExt,
  ArrayExt,
  Bounds,
  Credential,
  DateExt,
  Event,
  Events,
  Feature,
  Geometry,
  LonLat,
  Pixel,
  Size,
  CommonUtil,
  GeometryVector,
  DataFormat,
  ServerType,
  GeometryType,
  QueryOption,
  JoinType,
  EngineType,
  MeasureMode,
  SpatialRelationType,
  DataReturnMode,
  Unit,
  BufferRadiusUnit,
  SpatialQueryMode,
  ThemeGraphTextFormat,
  ThemeGraphType,
  GraphAxesTextDisplayMode,
  GraduatedMode,
  RangeMode,
  ThemeType,
  ColorGradientType,
  TextAlignment,
  FillGradientMode,
  SideType,
  AlongLineDirection,
  LabelBackShape,
  LabelOverLengthMode,
  DirectionType,
  OverlayOperationType,
  SupplyCenterType,
  TurnType,
  BufferEndType,
  SmoothMethod,
  SurfaceAnalystMethod,
  ColorSpaceType,
  ChartType,
  EditType,
  TransferTactic,
  TransferPreference,
  GridType,
  ClientType,
  LayerType,
  UGCLayerType,
  StatisticMode,
  PixelFormat,
  SearchMode,
  SummaryType,
  InterpolationAlgorithmType,
  VariogramMode,
  Exponent,
  ClipAnalystMode,
  AnalystAreaUnit,
  AnalystSizeUnit,
  StatisticAnalystMode,
  TopologyValidatorRule,
  OutputType,
  AggregationQueryBuilderType,
  AggregationType,
  GetFeatureMode,
  RasterFunctionType,
  Format,
  GeoJSON,
  JSONFormat,
  WKT,
  ColorsPickerUtil,
  ArrayStatistic,
  ThemeStyle
} from '@supermap/iclient-common';
export { MapService } from './services/MapService';
export { FeatureService } from './services/FeatureService';
export { QueryService } from './services/QueryService';
export { AddressMatchService } from './services/AddressMatchService';
export { DataFlowService } from './services/DataFlowService';
export { Util } from './core/Util';
export { Graph } from './overlay/GraphThemeLayer';
export { Label } from './overlay/LabelThemeLayer';
export { MapvLayer } from './overlay/MapvLayer';
export { GraticuleLayer } from './overlay/GraticuleLayer';
export { RangeTheme3DLayer } from './overlay/RangeTheme3DLayer';
export { Range } from './overlay/RangeThemeLayer';
export { RankSymbol } from './overlay/RankSymbolThemeLayer';
export { UniqueTheme3DLayer } from './overlay/UniqueTheme3DLayer';
export { Unique } from './overlay/UniqueThemeLayer';
export { HeatMapLayer } from './overlay/HeatMapLayer';
export { DeckglLayer } from './overlay/DeckglLayer';
export * from './overlay/mapv';
export * from './overlay/theme';
export * from './control';
