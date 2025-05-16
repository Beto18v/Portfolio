import pygame
import random

class Food:
    def __init__(self, screen_width, screen_height, block_size):
        self.block_size = block_size
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.position = (0, 0)
        self.spawn()
    
    def spawn(self, snake_positions=None):
        # Generate random position for food
        x = random.randint(0, (self.screen_width - self.block_size) // self.block_size) * self.block_size
        y = random.randint(0, (self.screen_height - self.block_size) // self.block_size) * self.block_size
        
        # Make sure food doesn't spawn on the snake
        if snake_positions:
            while (x, y) in snake_positions:
                x = random.randint(0, (self.screen_width - self.block_size) // self.block_size) * self.block_size
                y = random.randint(0, (self.screen_height - self.block_size) // self.block_size) * self.block_size
        
        self.position = (x, y)
    
    def draw(self, surface):
        # Food
        x, y = self.position
        food_rect = pygame.Rect(x, y, self.block_size, self.block_size)
        pygame.draw.rect(surface, (255, 0, 0), food_rect)  # Red food
        
        # Add a highlight to make it look like an apple
        pygame.draw.circle(surface, (255, 255, 255), (x + 5, y + 5), 2)