﻿/// <reference path="../../../API.ts" />

/// <reference path="../WebServer.ts" />

namespace samchon.protocol
{
	/**
	 * A substitute {@link WebServer}.
	 * 
	 * The {@link WebServerBase} is a substitute class who subrogates {@link WebServer}'s responsibility.
	 * 
	 * #### [Inherited] {@link IServerBase}
	 * @copydoc IServerBase
	 */
	export class WebServerBase
		extends WebServer
		implements IServerBase
	{
		/**
		 * @hidden
		 */
		private hooker_: IServer;

        /* -------------------------------------------------------------------
			CONSTRUCTORS
		------------------------------------------------------------------- */
		/**
		 * Construct from a *hooker*.
		 * 
		 * @param hooker A hooker throwing responsibility of server's role.
		 */
		public constructor(hooker: IServer)
		{
			super();
			this.hooker_ = hooker;
		}

		/**
		 * @inheritdoc
		 */
		public addClient(driver: IClientDriver): void
		{
			this.hooker_.addClient(driver);
		}
	}
}