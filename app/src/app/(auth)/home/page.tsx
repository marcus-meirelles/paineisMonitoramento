import Template from "@/app/components/ui/template";

export default function Home() {
  return (
    <>
      <Template>
        <div className="h-180"> 
          <div className="flex flex-row gap-4 h-1/5 px-2 py-2">
            <div className="border-1 px-8 py-8 w-1/6">
              10M Usuarios
            </div>
            
            <div className="border-1 px-8 py-8 w-1/6">
              10M Usuarios
            </div>
            
            <div className="border-1 px-8 py-8 w-1/6">
              10M Usuarios
            </div>

            <div className="border-1 px-8 py-8 w-1/6">
              10M Usuarios
            </div>

            <div className="flex flex-row border-1 px-8 py-8 w-2/6">
              <div>
                <select name="" id="">
                  <option value="">Item #1</option>
                  <option value="">Item #2</option>
                </select>
              </div>
              
              <div>
                <select name="" id="">
                  <option value="">Item #1</option>
                  <option value="">Item #2</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-2/5">
            <div className="flex flex-row gap-4 py-2 px-2 h-1/1">
              <div className="border-1 basis-1/3 p-4">
                1
              </div>
              <div className="border-1 basis-2/3">
                2
              </div>
            </div>
          </div>
          <div className="h-2/5">
            <div className="flex flex-row gap-4 py-2 px-2 h-1/1">
              <div className="border-1 basis-1/3">
                3
              </div>
              <div className="border-1 basis-2/3">
                4
              </div>
            </div>
          </div>
        </div>
      </Template> 
    </>
  );
}