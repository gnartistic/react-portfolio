// Runs before first paint to set the theme class — prevents a light/dark flash.
// Default is light unless the user previously chose dark or their OS prefers dark.
export function ThemeScript() {
  const js = `(function(){try{
    var s=localStorage.getItem('theme');
    var d=s? s==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(d)document.documentElement.classList.add('dark');
  }catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
