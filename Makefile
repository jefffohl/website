.PHONY: dev clean

dev:
	@tmux new-session -d -s website
	@tmux split-window -h -t website
	@tmux send-keys -t website:0.0 'cd backend && npm run dev' C-m
	@tmux send-keys -t website:0.1 'cd frontend && npm run dev' C-m
	@tmux attach -t website

clean:
	@tmux kill-session -t website 2>/dev/null || true
	@cd frontend && rm -rf .next
	@cd backend && rm -rf .strapi 