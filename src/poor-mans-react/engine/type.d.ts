import { Observable } from 'rxjs';

type asyncPropType<T> = {
  [P in keyof React.HTMLAttributes<T>]: Observable<React.HTMLAttributes<T>[P]>;
};

declare module 'react' {
  export interface HTMLAttributes<T> {
    asyncProps?: asyncPropType<T>;
  }
}
