// The components this site's own theme folder adds, declared under the @theme alias so tsc
// resolves them the way the bundler does (site src/theme shadows theme-classic).
declare module '@theme/DocMetaRow' {
  export {
    default,
    DocMetaPlacementContext,
    useDocMetaPlacement,
    type DocMetaPlacement,
  } from './theme/DocMetaRow';
}
