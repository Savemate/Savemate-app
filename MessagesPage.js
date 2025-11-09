export class MessagesPage {
    static render() {
        return `
            <div class="page" id="messagesPage">
                <h2 class="section-title">Messages</h2>
                
                <div class="conversation-list">
                    <div class="conversation" onclick="App.openConversation('John Doe')">
                        <div class="conversation-avatar">JD</div>
                        <div>
                            <div style="font-weight: 500;">John Doe</div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Thanks for the tip about Checkers!</div>
                        </div>
                    </div>
                    <div class="conversation" onclick="App.openConversation('Mary Johnson')">
                        <div class="conversation-avatar">MJ</div>
                        <div>
                            <div style="font-weight: 500;">Mary Johnson</div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Did you see the new Woolworths deal?</div>
                        </div>
                    </div>
                    <div class="conversation" onclick="App.openConversation('David Smith')">
                        <div class="conversation-avatar">DS</div>
                        <div>
                            <div style="font-weight: 500;">David Smith</div>
                            <div style="color: var(--text-secondary); font-size: 14px;">Hey, are you still selling those headphones?</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}