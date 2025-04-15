const base_igoss_url = import.meta.env.VITE_IGOSS_BASE_URL;
const igoss_app_id = import.meta.env.VITE_IGOSS_APP_ID
const scriptId = 'igoss_embed_scripts_0';

export const useIgoss = () => {

  const win = (<any>window);

  const loadScript = (url: string, callback: any) => {

    if (!win.document.getElementById(scriptId)) {
      var head = win.document.head;
      var script = win.document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.src = url;
      script.onreadystatechange = callback;
      script.onload = callback;
      head.appendChild(script);
    }
    else callback?.();

  }


  return {
    init: (options: any) => {

        var dv= win.document.createElement('div');
        dv.className ='ig-sidebar-loading';

        win.document.body.className += ' has-igoss';

        win.document.body.appendChild(dv);
      
        loadScript(`${base_igoss_url}/embed/scripts/${igoss_app_id}`, () => {
        var data = { ...options, app_id: igoss_app_id };
        win.__initIgoss(data);
      });

    },
    updateNotificationList: () => {
      return win.__updateNotificationList();
    },



    //onReceiveMessage: onReceiveMessage,
  };
};
