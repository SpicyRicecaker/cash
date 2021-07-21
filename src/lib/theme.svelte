<div id="theme-circle">
	<select name="theme" id="theme">
		<option value="gruvbox-material-light" selected>Gruvbox Material Light</option>
		<option value="gruvbox-material-dark">Gruvbox Material Dark</option>
		<option value="solarized-light">Solarized Light</option>
		<option value="solarized-dark">Solarized Dark</option>
	</select>
	<span>
		<span>&nbsp;</span>
		<span>&nbsp;</span>
		<span>&nbsp;</span>
		<span>&nbsp;</span>
		<span>&nbsp;</span>
		<span>&nbsp;</span>
	</span>
</div>

<style lang="scss">
	#theme-circle {
		display: flex;
		// text-align: center;
		& > #theme {
			// Style
			border-radius: 0;
			border: 0;
			padding: 0.2rem;
			appearance: none;
			// Animation
			transition: 1s;
			// Font
			font-size: 1rem;
		}
		& > span {
			flex: 1;
			display: flex;
			& > * {
				flex: 1;
			}
		}
	}

	#theme-circle {
		& > span {
			:nth-child(1) {
				background-color: var(--red);
			}
			:nth-child(2) {
				background-color: var(--grn);
			}
			:nth-child(3) {
				background-color: var(--yel);
			}
			:nth-child(4) {
				background-color: var(--blu);
			}
			:nth-child(5) {
				background-color: var(--mag);
			}
			:nth-child(6) {
				background-color: var(--cya);
			}
		}
	}
</style>
