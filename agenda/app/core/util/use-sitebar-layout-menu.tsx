import {useEffect, useState} from "react";
import {ReplaySubject, Subscription} from "rxjs";
import {MenuItem} from "primereact/menuitem";

const useSidebarLayoutMenu = () =>{

  const [menuAtivo, setMenuAtivo] = useState<MenuItem|undefined>();

  const subscribeMenuAtivoChange = (next: (value: MenuItem|undefined) => void) => {
    return MenuAtivoSubscriptionService.subscribe(next);
  };

  useEffect(() => {
    MenuAtivoSubscriptionService.next(menuAtivo);
  }, [menuAtivo]);

  return {
    subscribeMenuAtivoChange,
    setMenuAtivo
  };
};

export default useSidebarLayoutMenu;

class MenuAtivoSubscriptionService {

  private static instance:MenuAtivoSubscriptionService;

  private replaySubject:ReplaySubject<MenuItem|undefined> = new ReplaySubject<MenuItem|undefined>(0);

  private constructor(){}

  public static subscribe(next: (value: MenuItem|undefined) => void):Subscription{
    return this.getInstance().replaySubject.subscribe(next);
  }

  public static next(menuAtivo:MenuItem|undefined):void{
    this.getInstance().replaySubject.next(menuAtivo);
  }

  private static getInstance(){
    if(this.instance == null){
      this.instance = new MenuAtivoSubscriptionService();
    }

    return this.instance;
  }
}
