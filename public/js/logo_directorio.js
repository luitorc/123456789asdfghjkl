/******************************* variables *******************/
			//Preparamos el render
			var Render=new THREE.WebGLRenderer({ antialias: true });
			Render.shadowMapEnabled = true;
			//El escenario
			var Escenario=new THREE.Scene();
			
			// la Figura 
			var Figura;
			var controls;
			var Ancho=60;
			var Alto=60;
			
			var Angulo = 45;	
			var Aspecto=Ancho/Alto;
			var cerca=1;
			var lejos=10000;

			//La cámara
			var Camara=new THREE.PerspectiveCamera(Angulo,Aspecto,cerca,lejos);
			// THREEx.WindowResize(Render, Camara);
			
			/******************************* inicio *******************/
			function inicio(){
					//Tamaño del render(resultado)
					Render.setSize(Ancho,Alto);
					//Se agrega el render al documento html
					document.getElementById('render').appendChild(Render.domElement);
					//Acercamos la cámara en z es profundidad para ver el punto
					Camara.position.x=2;
					Camara.position.y=1;
					Camara.position.z=100;
					//agregando la cámara al escenario
					Escenario.add(Camara);
					// agregamos todo el escenario y la cámara al render
					// controls=new THREE.OrbitControls(Camara,Render.domElement);
			}
			// cargar nuevos modelos
			
			dist = 30;
			function animacion(){
					
					requestAnimationFrame(animacion);
					render_modelo();
					
					tiempo=0.001;
					distancia=dist;
					recorrido=distancia*tiempo;
					
					//rotar
					// mallaCubo.rotation.x+=recorrido;
					mallaCubo.rotation.y+=recorrido;
					// mallaCubo.rotation.z+=recorrido;
					
					// escalar
					// mallaCubo.scale.x+=recorrido*0.1;
					// mallaCubo.scale.y+=recorrido*0.1;
					// mallaCubo.scale.z+=recorrido*0.1;
					
					//traslación
					// mallaCubo.position.x+=0.1;
					
					// mallaCubo.rotation.x=Math.PI/6;
					
					
					
			}
			function render_modelo(){
					// controls.update();
					Render.render(Escenario,Camara);
			}
			/**************************llamado a las funciones ******************/
			function cargar_cubo(){
				geometriaCubo = new THREE.CubeGeometry( 45, 45, 45 );
				var texture = THREE.ImageUtils.loadTexture( 'texturas/logo_directorio.png' );
				var material = new THREE.MeshBasicMaterial( { map: texture } );
				mallaCubo = new THREE.Mesh( geometriaCubo,material);
				Escenario.add(mallaCubo);
				mallaCubo.position.set(2,0,10);
			}
			cargar_cubo();
			
			inicio();
			animacion();