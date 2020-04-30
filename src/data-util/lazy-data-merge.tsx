
type LookupFn=(data:unknown)=>[string, unknown]
const mountPoints = (datas:unknown[],lookup)=> datas.map(lookup)

export const merge1to1 = (parentData,attachData,mntFn:LookupFn,mountPoint?:string) => mountPoints(parentData,mntFn)
export const merge1toMany = () => 11
