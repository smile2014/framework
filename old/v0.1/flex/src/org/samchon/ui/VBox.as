package org.samchon.ui
{
	import mx.containers.VBox;
	
	public class VBox extends mx.containers.VBox
	{
		public function VBox()
		{
			super();
		}
		public function set padding(value:int):void {
			this.setStyle("paddingTop", value);
			this.setStyle("paddingLeft", value);
			this.setStyle("paddingRight", value);
			this.setStyle("paddingBottom", value);
		}
	}
}