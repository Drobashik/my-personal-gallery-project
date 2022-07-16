import { BehaviorSubject, Observable, of, switchMap } from "rxjs";

export class LoadingHandler {
    private _isLoading$ = new BehaviorSubject(false);

    isLoading$: Observable<boolean> = this._isLoading$.pipe(
        switchMap(isLoading => {
            if(!isLoading) {
                return of(false);
            }
            return of(true);
        })
    )

    beginLoading() {
        this._isLoading$.next(true);
    }

    endLoading() {
        this._isLoading$.next(false)
    }

}